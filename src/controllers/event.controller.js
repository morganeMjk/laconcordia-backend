const Event = require("../models/event.model");
const User = require("../models/user.model");
const { sendMail } = require("../utils/mailer.utils");
const jwt = require("jsonwebtoken");

exports.Create = async (req, res) => {
    try {
        const { title, content, eventDate, isNotified } = req.body;

        const { id: authorId } = req.decoded;

        const thumbnail = req.file.filename;

        if (!title || !thumbnail || !content || !eventDate || !authorId) {
            return res.status(400).json({
                error: true,
                message: "Requête invalide."
            });
        }

        // Join the user name from the authorId from user table
        // await new Event({
        //     title: title,
        //     thumbnail: thumbnail,
        //     eventDate: eventDate,
        //     content: content,
        //     authorId: authorId
        // }).save();


        await Event.create({
            title: title,
            thumbnail: thumbnail,
            eventDate: eventDate,
            content: content,
            authorId: authorId
        });

        if (isNotified) {
            const usersWithNotification = await User.findAll({ where: { notification: true } });

            usersWithNotification.forEach(async (user) => {
                await sendMail("newEvent", {}, user.email);
            });
        }

        return res.status(201).json({
            error: false,
            message: "L'évènement a bien été créé."
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue, veuillez réessayer plus tard."
        })
    }
}

exports.GetAll = async (req, res) => {
    try {
        const events = await Event.findAll();

        return res.status(200).json({
            error: false,
            message: "Les évènements ont bien été récupérés",
            data: events
        })
    } catch (error) {
        console.log("error");
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue, veuillez réessayer plus tard."
        })
    }
}

exports.GetById = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id || isNaN(id)) {
            return res.status(400).json({
                error: true,
                message: "Requête invalide."
            });
        }

        const event = await Event.findOne({ where: { id: id } });

        if (!event) {
            return res.status(404).json({
                error: true,
                message: "L'évènement est introuvable."
            });
        }

        return res.status(200).json({
            error: false,
            message: "L'évènement a été récupéré.",
            data: event
        });
    } catch (error) {
        console.log("error");
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue, veuillez réessayer plus tard."
        })
    }
}

exports.Update = async (req, res) => {
    try {
        const { id, title, eventDate, content } = req.body;

        const medias = req.file;

        if (!id || isNaN(id)) {
            return res.status(400).json({
                error: true,
                message: "Requête invalide."
            });
        }

        const event = await Event.findOne({ where: { id: id } });

        if (!event) {
            return res.status(404).json({
                error: true,
                message: "L'article est introuvable."
            });
        }

        const eventData = {
            title: title || event.title,
            content: content || event.content,
            eventDate: eventDate || event.eventDate,
            thumbnail: medias?.filename || event.thumbnail
        }

        await event.update(eventData);

        return res.status(200).json({
            error: false,
            message: "L'article a bien été mis à jour."
        });

    } catch (error) {
        console.log("error");
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue, veuillez réessayer plus tard."
        })
    }
}

exports.Delete = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id || isNaN(id)) {
            return res.status(400).json({
                error: true,
                message: "Requête invalide."
            });
        }

        const event = await Event.findOne({ where: { id: id } });

        if (!event) {
            return res.status(404).json({
                error: true,
                message: "L'évènement est introuvable."
            });
        }

        await event.destroy();

        return res.status(201).json({
            error: false,
            message: "L'évènement a bien été supprimée."
        });
    } catch (error) {
        console.log("error");
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue, veuillez réessayer plus tard."
        })
    }
}