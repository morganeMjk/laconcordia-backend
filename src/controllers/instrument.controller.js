const Instrument = require("../models/instrument.model");
const Status = require("../models/status.model");

exports.Create = async (req, res) => {
    try {
        const { name, label, statusId } = req.body;

        if (!name || !label || !statusId) {
            return res.status(400).json({
                error: true,
                message: "Requête invalide."
            });
        }

        const isStatusExist = await Status.findOne({ where: { id: statusId } });

        if (!isStatusExist) {
            return res.status(404).json({
                error: true,
                message: "Le statut est introuvable."
            });
        }

        await new Instrument({
            name: name,
            label: label,
            statusId: statusId
        }).save();

        return res.status(201).json({
            error: false,
            message: "L'instrument a bien été créé."
        });
    } catch (error){
        console.log("error");
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue, veuillez réessayer plus tard."
        })
    }
}

exports.GetAll = async (req, res) => {
    try {
        const instruments = await Instrument.findAll();

        return res.status(200).json({
            error: false,
            message: "Les instruments ont bien été récupérés",
            data: instruments
        })
    } catch (error){
        console.log("error");
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

        const instrument = await Instrument.findOne({ where: { id: id } });

        if (!instrument) {
            return res.status(404).json({
                error: true,
                message: "L'instrument est introuvable."
            });
        }

        return res.status(200).json({
            error: false,
            message: "L'instrument a été récupéré.",
            post: instrument
        });
    } catch (error){
        console.log("error");
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue, veuillez réessayer plus tard."
        })
    }
}

exports.Update = async (req, res) => {
    try {

    } catch (error){
        console.log("error");
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue, veuillez réessayer plus tard."
        })
    }
}

exports.Delete = async (req, res) => {
    try {

    } catch (error){
        console.log("error");
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue, veuillez réessayer plus tard."
        })
    }
}