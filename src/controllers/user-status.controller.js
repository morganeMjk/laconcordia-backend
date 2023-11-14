const UserStatus = require("../models/user-status.model");
const Status = require('./../models/status.model');
const User = require("../models/user.model");
const { Op } = require("sequelize");

exports.Create = async (req, res) => {
    try {
        const { userId, statusId } = req.body;

        if (!userId || !statusId || isNaN(userId) || isNaN(statusId)) {
            return res.status(400).json({
                error: true,
                message: "Requête invalide."
            });
        }

        const isStatusExist = await Status.findOne({ where: { id: statusId } });
        const isUserExist = await User.findOne({ where: { id: userId } });

        if (!isStatusExist || !isUserExist) {
            return res.status(404).json({
                error: true,
                message: !isStatusExist && !isUserExist ? "L'utilisateur et le status sont introuvables." : !isStatusExist ? "Le status est introuvable." : "L'utilisateur est introuvable."
            });
        }

        await new UserStatus({ userId: userId, statusId: statusId }).save();

        return res.status(201).json({
            error: false,
            message: "La relation entre utilisateur et status a bien été créée."
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
        const userStatus = await UserStatus.findAll();

        const formattedUserStatus = [];

        userStatus.forEach((userStatusData) => {
            formattedUserStatus.push({ userId: userStatusData.userId, statusId: userStatusData.statusId })
        });

        return res.status(200).json({
            error: false,
            message: "Les relations entre utilisateurs et status ont bien été récupérées",
            data: formattedUserStatus
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

        const userStatus = await UserStatus.findOne({ where: { id: id } });

        if (!userStatus) {
            return res.status(404).json({
                error: true,
                message: "La relation entre utilisateur et status est introuvable."
            });
        }

        return res.status(200).json({
            error: false,
            message: "La relation entre utilisateur et status a été récupérée.",
            post: userStatus
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
        const { userId, statusId } = req.body;

        if (!userId || !statusId || isNaN(userId) || isNaN(statusId)) {
            return res.status(400).json({
                error: true,
                message: "Requête invalide."
            });
        }

        const userStatus = await UserStatus.findOne({ where: { [Op.and]: [{ userId: userId }, { statusId: statusId }] } });

        if (!userStatus) {
            return res.status(404).json({
                error: true,
                message: "La relation entre utilisateur et status est introuvable."
            });
        }
        

        await userStatus.destroy();

        return res.status(201).json({
            error: false,
            message: "La relation entre utilisateur et status a bien été supprimée."
        });
    } catch (error){
        console.log(error);
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue, veuillez réessayer plus tard."
        })
    }
}