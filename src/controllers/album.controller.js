const Album = require("../models/album.model");
const Media = require("../models/media.model");

exports.Create = async (req, res) => {
    try {
        const { title } = req.body;
        const thumbnail = req.file.filename;

        if (!title || !thumbnail) {
            return res.status(400).json({
                error: true,
                message: "Requête invalide."
            });
        }

        const album = await new Album({
            title: title,
            thumbnail: thumbnail
        }).save();

        const albumId = album.id;

        return res.status(201).json({
            error: false,
            id: {albumId},
            message: `L'album a bien été créé ${albumId}.`,
        });
    } catch (error) {
        console.log("error");
        const errorMessage = error?.message;
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue, veuillez réessayer plus tard."
        })
    }
}

// [... AJOUT DES AUTRES FONCTIONS DU CRUD ...]


exports.GetAll = async (req, res) => {
    try {
        const albums = await Album.findAll();

        return res.status(200).json({
            error: false,
            message: "Les albums ont bien été récupérés",
            data: albums
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

        const album = await Album.findOne({ where: { id: id } });

        if (!album) {
            return res.status(404).json({
                error: true,
                message: "L'album est introuvable."
            });
        }

        const medias = await Media.findAll({ where: { albumId: album.id } });

        return res.status(200).json({
            error: false,
            message: "L'album a été récupéré.",
            data: { album, medias }
        });
    } catch (error) {
        console.log("error");
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue, veuillez réessayer plus tard."
        })
    }
}

// [... AJOUT DES AUTRES FONCTIONS DU CRUD ...]







exports.Update = async (req, res) => {
    try {
        const { id, title } = req.body;
        const thumbnail = req.file;

        if (!id || isNaN(id)) {
            return res.status(400).json({
                error: true,
                message: "Requête invalide."
            });
        }

        const album = await Album.findOne({ where: { id: id } });

        if (!album) {
            return res.status(404).json({
                error: true,
                message: "L'album est introuvable."
            });
        }

        const albumData = {
            title: title || news.title,
            thumbnail: thumbnail?.filename || album.thumbnail
        }

        await album.update(albumData);

        return res.status(200).json({
            error: false,
            message: "L'album a bien été mis à jour."
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

        const album = await Album.findOne({ where: { id: id } });

        if (!album) {
            return res.status(404).json({
                error: true,
                message: "L'album est introuvable."
            });
        }
        
        await album.destroy();

        return res.status(201).json({
            error: false,
            message: "L'album a bien été supprimée."
        });
    } catch (error) {
        console.log("error");
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue, veuillez réessayer plus tard."
        })
    }
}