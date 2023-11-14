const UserRole = require("../models/user-role.model");
const Roles = require('./../models/role.model');
const User = require('./../models/user.model');
const { Op } = require("sequelize");

exports.Create = async (req, res) => {
    try {
        const { userId, roleId } = req.body;

        if (!userId || !roleId || isNaN(userId) || isNaN(roleId)) {
            return res.status(400).json({
                error: true,
                message: "Requête invalide."
            });
        }

        const isRoleExist = await Roles.findOne({ where: { id: roleId } });
        const isUserExist = await User.findOne({ where: { id: userId } });

        if (!isRoleExist || !isUserExist) {
            return res.status(404).json({
                error: true,
                message: !isRoleExist && !isUserExist ? "L'utilisateur et le rôle sont introuvables." : !isRoleExist ? "Le rôle est introuvable." : "L'utilisateur est introuvable."
            });
        }

        await new UserRole({ userId: userId, roleId: roleId }).save();

        return res.status(201).json({
            error: false,
            message: "La relation entre utilisateur et rôle a bien été créée."
        });
    } catch (error) {
        console.log("error");
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue, veuillez réessayer plus tard."
        })
    }
}

exports.GetAll = async (req, res) => {
    try {
        const userRoles = await UserRole.findAll();

        const formattedUserRole = [];

        userRoles.forEach((userRole) => {
            formattedUserRole.push({ userId: userRole.userId, roleId: userRole.roleId })
        });

        return res.status(200).json({
            error: false,
            message: "Les relations entre utilisateurs et roles ont bien été récupérées",
            data: formattedUserRole
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
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).json({
                error: true,
                message: "Requête invalide."
            });
        }

        const userRole = await UserRole.findOne({ where: { id: id } });

        if (!userRole) {
            return res.status(404).json({
                error: true,
                message: "La relation entre utilisateur et role est introuvable."
            });
        }

        return res.status(200).json({
            error: false,
            message: "La relation entre utilisateur et role a été récupérée.",
            post: userRole
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
        const { userId, roleId } = req.body;

        if (!userId || !roleId || isNaN(userId) || isNaN(roleId)) {
            return res.status(400).json({
                error: true,
                message: "Requête invalide."
            });
        }

        const userRole = await UserRole.findOne({ where: { [Op.and]: [{ userId: userId }, { roleId: roleId }] } });

        if (!userRole) {
            return res.status(404).json({
                error: true,
                message: "La relation entre utilisateur et rôle est introuvable."
            });
        }
        
        await userRole.destroy();

        return res.status(201).json({
            error: false,
            message: "La relation entre utilisateur et rôle a bien été supprimée."
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue, veuillez réessayer plus tard."
        });
    }
}