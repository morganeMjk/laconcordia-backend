const User = require("../models/user.model");
const Status = require("../models/status.model");
const UserStatus = require("../models/user-status.model");

const checkStatus = (status) => {
    console.log("Status : ", status)
    return async (req, res, next) => {
        try {
            if (!status || status.length === 0 || !Array.isArray(status)) {
                throw new Error("Status non renseigné.");
            }

            const { id } = req.decoded;

            // 1. Chercher dans user-role tous les status de l'utilisateur
            const statusRelations = await UserStatus.findAll({
                where: {
                    userId: id
                }
            });

            console.log("Status : ", status)
            console.log("Status relations : ", statusRelations)
            if (!statusRelations || statusRelations.length === 0) {
                return res.status(403).json({
                    error: true,
                    message: "Accès interdit."
                });
            }

            // 2. Chercher dans roles tous les roles qui correspondent à la liste des roles
            const statusIds = statusRelations.map((status) => status.statusId);
            const statusFound = await Status.findAll();

            const userStatus = statusFound.filter((status) => statusIds.includes(status.id));
            // 3. Si la liste des roles est vide, alors l'utilisateur n'a pas les droits et si elle est remplie, et qu'elle contient le ou les status, alors l'utilisateur a les droits
            if (!userStatus || userStatus.length === 0) {
                return res.status(403).json({
                    error: true,
                    message: "Accès interdit."
                });
            }

            const userStatusTypes = userRoles.map((status) => status.type);

            const isAuthorized = userRolesNames.some((item) => status.includes(item));
            console.log(isAuthorized)
            console.log(userStatusTypes)
            console.log(status)
            if (!isAuthorized) {
                return res.status(403).json({
                    error: true,
                    message: "Accès interdit."
                });
            }

            next();
        } catch (error) {
            return res.status(500).json({
                error: true,
                message: error.message
            });
        }
    };
};

module.exports = checkStatus;