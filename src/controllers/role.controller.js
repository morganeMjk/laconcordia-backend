const Role = require("../models/role.model");

exports.Create = async (req, res) => {
    try {
        const { name, label } = req.body;

        if (!name || !label) {
            return res.status(400).json({
                error: true,
                message: "Requête invalide."
            });
        }

        const role = await Role.findOne({ where: { name: name } });

        if (role) {
            return res.status(409).json({
                error: true,
                message: "Le rôle existe déjà."
            });
        }

        await new Role({
            name: name,
            label: label
        }).save();

        return res.status(201).json({
            error: false,
            message: "Le rôle a bien été créé."
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
        const roles = await Role.findAll();

        return res.status(200).json({
            error: false,
            message: "Les rôles ont bien été récupérés",
            data: roles
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

        const role = await Role.findOne({ where: { id: id } });

        if (!role) {
            return res.status(404).json({
                error: true,
                message: "Le rôle est introuvable."
            });
        }

        return res.status(200).json({
            error: false,
            message: "Le rôle a été récupéré.",
            post: role
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

    } catch (error) {
        console.log("error");
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue, veuillez réessayer plus tard."
        })
    }
}