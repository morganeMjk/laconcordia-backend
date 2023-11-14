const User = require("../models/user.model");
const Role = require("../models/role.model");
const UserRole = require("../models/user-role.model");

const restricted = (roles) => {
    return async (req, res, next) => {
        try {
            if (!roles || roles.length === 0 || !Array.isArray(roles)) {
                throw new Error("Role non renseigné.");
            }

            const { id } = req.decoded;

            // 1. Chercher dans user-role tous les roles de l'utilisateur
            const rolesRelations = await UserRole.findAll({
                where: {
                    userId: id
                }
            });

            if (!rolesRelations || rolesRelations.length === 0) {
                return res.status(403).json({
                    error: true,
                    message: "Accès interdit."
                });
            }

            // 2. Chercher dans roles tous les roles qui correspondent à la liste des roles
            const rolesIds = rolesRelations.map((role) => role.roleId);
            const rolesFound = await Role.findAll();

            const userRoles = rolesFound.filter((role) => rolesIds.includes(role.id));
            // 3. Si la liste des roles est vide, alors l'utilisateur n'a pas les droits et si elle est remplie, et qu'elle contient le ou les roles, alors l'utilisateur a les droits
            if (!userRoles || userRoles.length === 0) {
                return res.status(403).json({
                    error: true,
                    message: "Accès interdit."
                });
            }

            const userRolesNames = userRoles.map((role) => role.name);

            const isAuthorized = userRolesNames.some((role) => roles.includes(role));
            console.log(isAuthorized)
            console.log(userRolesNames)
            console.log(roles)
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

module.exports = restricted;