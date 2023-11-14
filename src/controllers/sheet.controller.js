const Sheet = require("../models/sheet.model");

exports.Create = async (req, res) => {
    try {
        const { title, artist, instrumentId } = req.body;
        const sheetFile = req.file.filename;


        if (!title || !sheetFile || !artist || !instrumentId) {
            return res.status(400).json({
                error: true,
                message: "Requête invalide."
            });
        }

        await new Sheet({
            title: title,
            sheetFile: sheetFile,
            artist: artist,
            instrumentId: instrumentId
        }).save();

        return res.status(201).json({
            error: false,
            message: "La partition a bien été créée."
        });
    } catch (error){
        console.log(error);
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue, veuillez réessayer plus tard."
        })
    }
}

exports.GetAll = async (req, res) => {
    try {        
        const sheets = await Sheet.findAll();

        return res.status(200).json({
            error: false,
            message: "Les partitions ont bien été récupérées",
            data: sheets
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
        const { id } = req.body;

        if (!id || isNaN(id)) {
            return res.status(400).json({
                error: true,
                message: "Requête invalide."
            });
        }

        const sheet = await Sheet.findOne({ where: { id: id } });

        if (!sheet) {
            return res.status(404).json({
                error: true,
                message: "La partition est introuvable."
            });
        }

        return res.status(200).json({
            error: false,
            message: "La partition a été récupéré.",
            data: sheet
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
        const { id, title, artist, instrumentId } = req.body;

        const sheetFile = req?.file?.filename;

        if (!id || isNaN(id)) {
            return res.status(400).json({
                error: true,
                message: "Requête invalide."
            });
        }

        const sheet = await Sheet.findOne({ where: { id: id } });

        if (!sheet) {
            return res.status(404).json({
                error: true,
                message: "La partition est introuvable."
            });
        }

        const sheetData = {
            title: title || sheet.title,
            artist: artist || sheet.artist,
            instrumentId: instrumentId || sheet.instrumentId,
            sheetFile: sheetFile || sheet.sheetFile
        }

        await sheet.update(sheetData);

        return res.status(200).json({
            error: false,
            message: "La partition a bien été mis à jour."
        });

    } catch (error){
        console.log(error);
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

        const sheet = await Sheet.findOne({ where: { id: id } });

        if (!sheet) {
            return res.status(404).json({
                error: true,
                message: "La partition est introuvable."
            });
        }
        
        await sheet.destroy();

        return res.status(201).json({
            error: false,
            message: "La partition a bien été supprimée."
        });
    } catch (error){
        console.log("error");
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue, veuillez réessayer plus tard."
        })
    }
}