const Message = require("../models/message.model");
const { phone } = require("phone");
const { sendMail } = require("../utils/mailer.utils");

exports.Create = async (req, res) => {
    try {
        const { lastName, firstName, email, subject, message } = req.body;
        let { phoneNumber } = req.body;
        console.log("req.body", req.body)
        if (!lastName || !firstName || !email || !subject || !message) {
            return res.status(400).json({
                error: true,
                message: "Requête invalide."
            });
        }

        if (phoneNumber) {
            const phoneFormat = phone(phoneNumber, "FR", { validateMobilePrefix: false, strictDetection: false });
            console.log("phoneFormat", phoneFormat)
            if (!phoneFormat.isValid) {
                return res.status(400).json({
                    error: true,
                    message: "Le numéro de téléphone est invalide."
                });
            } else {
                phoneNumber = phoneFormat.phoneNumber;
            }
        }

        const sendedMail = await sendMail("contact", { lastName, firstName, email, phoneNumber, subject, message }, email);

        await new Message({
            firstname: firstName,
            lastname: lastName,
            mail: email,
            phone: phoneNumber || null,
            subject,
            content: message,
        }).save();

        return res.status(201).json({
            error: false,
            message: "Votre message a bien été envoyé."
        });
    } catch (error) {
        console.log("error", error);
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue, veuillez réessayer plus tard."
        })
    }
}

exports.GetAll = async (req, res) => {
    try {
        const messages = await Message.findAll();

        return res.status(200).json({
            error: false,
            message: "Les messages ont bien été récupérés",
            data: messages
        })
    } catch (error) {
        console.log("error", error);
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue, veuillez réessayer plus tard."
        })
    }
}

exports.GetById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).json({
                error: true,
                message: "Requête invalide."
            });
        }

        const message = await Message.findOne({ where: { id: id } });

        if (!message) {
            return res.status(404).json({
                error: true,
                message: "Le message est introuvable."
            });
        }

        return res.status(200).json({
            error: false,
            message: "Le message a été récupéré.",
            post: message
        });
    } catch (error) {
        console.log("error", error);
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue, veuillez réessayer plus tard."
        })
    }
}

exports.Update = async (req, res) => {
    try {

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

    } catch (error) {
        console.log("error");
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue, veuillez réessayer plus tard."
        })
    }
}

exports.ArchiveMessage = async (req, res) => {
    try {
        const { id, state } = req.body;

        if (!id || isNaN(id)) {
            return res.status(400).json({
                error: true,
                message: "Requête invalide."
            });
        }

        const message = await Message.findOne({ where: { id: id } });

        if (!message) {
            return res.status(404).json({
                error: true,
                message: "Message introuvable."
            });
        }

        const messageData = {
            deletionDate: state ? new Date(Date.now()) : null,
        }

        console.log(state)

        if (state && message.deletionDate) {
            return res.status(400).json({
                error: true,
                archived: true,
                message: "Le message est déjà archivé."
            });
        } else if (!state && !message.deletionDate) {
            return res.status(400).json({
                error: true,
                archived: false,
                message: "Le message n'est pas archivé."
            });
        }

        await message.update(messageData);

        return res.status(200).json({
            error: false,
            message: state ? "Le message a bien été archivé." : "Le message a bien été désarchivé."
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue, veuillez réessayer plus tard."
        });
    }
}

exports.IsReadMessage = async (req, res) => {
    try {
        const { id, state } = req.body;

        if (!id || isNaN(id)) {
            return res.status(400).json({
                error: true,
                message: "Requête invalide."
            });
        }

        const message = await Message.findOne({ where: { id: id } });

        if (!message) {
            return res.status(404).json({
                error: true,
                message: "Message introuvable."
            });
        }

        const messageData = {
            isRead: state ? true : false,
        }

        if (state && message.isRead) {
            return res.status(400).json({
                error: true,
                message: "Le message est déjà marqué comme lu."
            });
        } else if (!state && !message.isRead) {
            return res.status(400).json({
                error: true,
                message: "Le message n'est pas marqué comme lu."
            });
        }

        await message.update(messageData);

        return res.status(200).json({
            error: false,
            message: state ? "Le message est marqué comme lu." : "Le message n'est plus marqué comme lu."
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue, veuillez réessayer plus tard."
        });
    }
}