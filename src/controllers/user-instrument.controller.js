const UserInstrument = require("../models/user-instrument.model");
const Instrument = require("../models/instrument.model");
const User = require("../models/user.model");
const { Op } = require("sequelize");


exports.Create = async (req, res) => {
    try {
        const { userId, instrumentId } = req.body;

        if (!userId || !instrumentId || isNaN(userId) || isNaN(instrumentId)) {
            return res.status(400).json({
                error: true,
                message: "Requête invalide."
            });
        }

        const isInstrumentExist = await Instrument.findOne({ where: { id: instrumentId } });
        const isUserExist = await User.findOne({ where: { id: userId } });

        if (!isInstrumentExist || !isUserExist) {
            return res.status(404).json({
                error: true,
                message: !isInstrumentExist && !isUserExist ? "L'utilisateur et le rôle sont introuvables." : !isInstrumentExist ? "Le rôle est introuvable." : "L'utilisateur est introuvable."
            });
        }

        await new UserInstrument({ userId: userId, instrumentId: instrumentId }).save();

        return res.status(201).json({
            error: false,
            message: "La relation entre utilisateur et instrument a bien été créée."
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
        const userInstruments = await UserInstrument.findAll();

        const formattedUserInstrument = [];

        userInstruments.forEach((userInstrument) => {
            formattedUserInstrument.push({ userId: userInstrument.userId, instrumentId: userInstrument.instrumentId })
        });

        return res.status(200).json({
            error: false,
            message: "Les relations entre utilisateurs et partitions ont bien été récupérées",
            data: formattedUserInstrument
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

        const userInstrument = await UserInstrument.findOne({ where: { id: id } });

        if (!userInstrument) {
            return res.status(404).json({
                error: true,
                message: "La relation entre utilisateur et instrument est introuvable."
            });
        }

        return res.status(200).json({
            error: false,
            message: "La relation entre utilisateur et instrument a été récupérée.",
            post: userInstrument
        });
    } catch (error){
        console.log("error");
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue, veuillez réessayer plus tard."
        })
    }
}


exports.GetByUserId = async (req, res) => {
    try {
        
        const { userId } = req.body;
        
        if (!userId || isNaN(userId)) {
            return res.status(400).json({
                error: true,
                message: "Requête invalide."
            });
        }
        
        const userInstruments = await UserInstrument.findAll({ where: { userId: userId } });

        if (!userInstruments) {
            return res.status(404).json({
                error: true,
                message: "L'utilisateur n'est relié a aucun instrument."
            });
        }
        return res.status(200).json({
            error: false,
            message: "Les relations entre utilisateur et instruments ont bien été récupérés",
            data: userInstruments
        })
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
        const { userId, instrumentId } = req.body;

        if (!userId || !instrumentId || isNaN(userId) || isNaN(instrumentId)) {
            return res.status(400).json({
                error: true,
                message: "Requête invalide."
            });
        }

        const userInstrument = await UserInstrument.findOne({ where: { [Op.and]: [{ userId: userId }, { instrumentId: instrumentId }] } });

        if (!userInstrument) {
            return res.status(404).json({
                error: true,
                message: "La relation entre utilisateur et instrument est introuvable."
            });
        }
        
        await userInstrument.destroy();

        return res.status(201).json({
            error: false,
            message: "La relation entre utilisateur et instrument a bien été supprimée."
        });
    } catch (error){
        console.log(error);
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue, veuillez réessayer plus tard."
        })
    }
}