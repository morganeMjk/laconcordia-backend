const { Op } = require("sequelize");
const User = require("../models/user.model");
const { sendMail } = require("../utils/mailer.utils");
const { encryptPassword, comparePassword } = require("../utils/passwordHandler.utils");
const jwt = require('jsonwebtoken');
const { phone } = require('phone');
const UserInstrument = require('./../models/user-instrument.model');
const Instrument = require('./../models/instrument.model');
const UserStatus = require('./../models/user-status.model');
const Status = require('./../models/status.model');
const UserRole = require('./../models/user-role.model');
const Role = require('./../models/role.model');

exports.SignUp = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        let { phoneNumber } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                error: true,
                message: "Requête invalide."
            });
        }

        const nameRegex = /^[a-zA-Z]+$/;
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/i;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/i;

        if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
            return res.status(400).json({
                error: true,
                message: "Le nom et le prénom doivent contenir au moins 2 caractères et ne doivent pas contenir de chiffres."
            });
        }

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                error: true,
                message: "L'adresse email est invalide."
            });
        }

        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                error: true,
                message: "Le mot de passe doit contenir au moins 8 caractères dont une majuscule, une minuscule, un chiffre et un caractère spécial."
            });
        }


        if (phoneNumber) {
            const phoneData = await phone(phoneNumber, { country: 'FR' })
            if (!phoneData.isValid) {
                return res.status(400).json({
                    error: true,
                    message: 'Le numéro de téléphone est incorrect.'
                })
            } else {
                phoneNumber = phoneData.phoneNumber
            }
        }

        const isExist = await User.findOne({ where: { email: email } });

        if (isExist) {
            return res.status(409).json({
                error: true,
                message: "L'utilisateur existe déjà."
            });
        }

        const encodedPassword = await encryptPassword(password);
        // Générer un code à 6 chiffres
        const code = Math.floor(100000 + Math.random() * 900000);

        const userData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phoneNumber || null,
            password: encodedPassword,
            emailVerificationCode: code,
            // Rajouter 15 minutes à la date actuelle
            emailVerificationCodeExpiration: new Date(Date.now() + 15 * 60 * 1000)
        }

        // Envoi de l'email de vérification
        await sendMail("accountVerification", { code: code }, email);

        await new User(userData).save();
        return res.status(201).json({
            error: false,
            message: "L'utilisateur a été créé avec succès."
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue, veuillez réessayer plus tard."
        });
    }
}

exports.VerifyAccount = async (req, res) => {
    try {
        const { email, code } = req.body;

        if (!email || !code) {
            return res.status(400).json({
                error: true,
                message: "Requête invalide."
            });
        }

        const user = await User.findOne({ where: { email: email } });


        if (!user) {
            return res.status(401).json({
                error: true,
                message: "L'utilisateur n'existe pas et/ou le code est incorrect."
            });
        }

        if (code !== user.emailVerificationCode) {
            return res.status(401).json({
                error: true,
                message: "L'utilisateur n'existe pas et/ou le code est incorrect."
            });
        }

        const expirationDate = user.emailVerificationCodeExpiration;

        if (expirationDate < new Date()) {
            return res.status(401).json({
                error: true,
                message: "Le code a expiré."
            });
        }

        const userData = {
            emailVerificationCode: null,
            emailVerificationCodeExpiration: null,
            isActive: true
        }

        await user.update(userData);
        return res.status(200).json({
            error: false,
            message: "Le compte a été vérifié avec succès."
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue, veuillez réessayer plus tard."
        });
    }
}

exports.ResendVerification = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                error: true,
                message: "Requête invalide."
            });
        }

        const user = await User.findOne({ where: { email: email } });

        if (!user) {
            return res.status(401).json({
                error: true,
                message: "L'utilisateur n'existe pas et/ou le code est incorrect."
            });
        }
        // Vérifier si ça fait moins de 5 minutes
        // const expirationDate = user.emailVerificationCodeExpiration.setTime(user.emailVerificationCodeExpiration - ((5 * 60) * 1000));

        // if (expirationDate < new Date()) {
        //     return res.status(401).json({
        //         error: true,
        //         message: "Veuillez attendre 5 minutes avant d'envoyer un nouveau code."
        //     });
        // }


        // Générer un code à 6 chiffres
        const code = Math.floor(100000 + Math.random() * 900000);

        const userData = {
            emailVerificationCode: code,
            // Rajouter 15 minutes à la date actuelle
            emailVerificationCodeExpiration: new Date(Date.now() + 15 * 60 * 1000)
        }

        // Envoi de l'email de vérification
        await sendMail("accountVerification", { code: code }, user.email);

        await user.update(userData);
        return res.status(201).json({
            error: false,
            message: "Un nouveau code de vérification vient de vous être envoyé."
        });

    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue, veuillez réessayer plus tard."
        });
    }
}

exports.SignIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: true,
                message: "Requête invalide."
            });
        }


        const user = await User.findOne({ where: { email: email } });


        if (!user) {
            return res.status(401).json({
                error: true,
                message: "L'identifiant et/ou le mot de passe est incorrect."
            });
        }

        const isPasswordValid = await comparePassword(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                error: true,
                message: "L'identifiant et/ou le mot de passe est incorrect."
            });
        }

        if (user.deletionDate) {
            return res.status(401).json({
                error: true,
                archived: true,
                message: "Votre compte est désactivé, veuillez contacter un administrateur."
            })
        }

        if (!user.isActive) {
            return res.status(401).json({
                error: true,
                isNotVerified: true,
                message: "Ce compte n'est pas activé."
            });
        }

        // Générer un token
        // Il va permettre de vérifier l'identité de l'utilisateur lors de ses requêtes vers l'API
        // ExpiresIn : 30 seconds
        const token = jwt.sign({ id: user.id }, "LKKJSDFEFKONERLNERLNK", { expiresIn: '1h' });

        const userData = {
            accessToken: token,
        }

        await user.update(userData);

        return res.status(200).json({
            error: false,
            message: "Vous êtes connecté.",
            token: token
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue, veuillez réessayer plus tard."
        });
    }
}


exports.GetAll = async (req, res) => {
    try {
        const users = await User.findAll();

        return res.status(200).json({
            error: false,
            message: "Les utilisateurs ont bien été récupérés",
            data: users
        })
    } catch (error) {
        console.log("error");
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue, veuillez réessayer plus tard."
        })
    }
}


exports.GetAllBase = async (req, res) => {
    try {
        const users = await User.findAll({ where: { isPublic: true } });

        const formattedUsers = [];

        const userStatus = await UserStatus.findAll();

        const formattedUserStatus = [];

        userStatus.forEach((userStatusData) => {
            formattedUserStatus.push({ userId: userStatusData.userId, statusId: userStatusData.statusId });
        });

        users.map((user, index) => {
            if (formattedUserStatus.filter((status) => status.userId === user.id).length > 0) {
                const userData = {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    notification: user.notification
                }

                formattedUsers.push(userData);
            }

            if (index === users.length - 1) {
                return res.status(200).json({
                    error: false,
                    message: "Les utilisateurs ont bien été récupérés",
                    data: formattedUsers
                })
            }
        })
    } catch (error) {
        console.log("error");
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue, veuillez réessayer plus tard."
        })
    }
}

exports.GetProfile = async (req, res) => {
    try {
        const { email } = req.decoded;

        if (!email) {
            return res.status(401).json({
                error: true,
                message: "Accès interdit."
            });
        }

        const user = await User.findOne({ where: { email: email } });

        if (!user) {
            return res.status(401).json({
                error: true,
                message: "Accès interdit."
            });
        }

        // Rôles 
        const roles = await UserRole.findAll({ where: { userId: user.id } });
        const rolesDetails = await Role.findAll();
        const userRoles = [];
        roles.forEach((role) => {
            rolesDetails.forEach((role2) => {
                if (role2.id === role.roleId) {
                    const userRoleData = {
                        name: role2.name,
                        label: role2.label
                    }
                    userRoles.push(userRoleData);
                }
            })
        });

        console.log(userRoles);
        // Instruments
        const instruments = await UserInstrument.findAll({ where: { userId: user.id } });

        const instrumentsDetails = await Instrument.findAll();
        const userInstruments = [];
        instruments.forEach((instrument) => {
            instrumentsDetails.forEach((instrument2) => {
                if (instrument2.id === instrument.instrumentId) {
                    const instrumentData = {
                        id: instrument2.id,
                        name: instrument2.name,
                        label: instrument2.label,
                    }
                    userInstruments.push(instrumentData);
                }
            })
        });
        // Status
        const status = await UserStatus.findAll({ where: { userId: user.id } });

        const statusDetails = await Status.findAll();
        const userStatus = [];
        status.forEach((data) => {
            statusDetails.forEach((status2) => {
                if (status2.id === data.statusId) {
                    const statusData = {
                        name: status2.name,
                        label: status2.label,
                        type: status2.type
                    }
                    userStatus.push(statusData);
                }
            })
        });

        return res.status(200).json({
            error: false,
            data:
            {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                deletionDate: user.deletionDate,
                notification: user.notification,
                userInstruments,
                userStatus,
                userRoles
            }
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue, veuillez réessayer plus tard."
        });
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

        const user = await User.findOne({ where: { id: id } });

        if (!user) {
            return res.status(404).json({
                error: true,
                message: "Utilisateur introuvable."
            });
        }

        // Rôles 
        const roles = await UserRole.findAll({ where: { userId: user.id } });
        const rolesDetails = await Role.findAll();
        const userRoles = [];
        roles.forEach((role) => {
            rolesDetails.forEach((role2) => {
                if (role2.id === role.roleId) {
                    const userRoleData = {
                        id: role2.id,
                        name: role2.name,
                        label: role2.label
                    }
                    userRoles.push(userRoleData);
                }
            })
        });

        console.log(userRoles);
        // Instruments
        const instruments = await UserInstrument.findAll({ where: { userId: user.id } });

        const instrumentsDetails = await Instrument.findAll();
        const userInstruments = [];
        instruments.forEach((instrument) => {
            instrumentsDetails.forEach((instrument2) => {
                if (instrument2.id === instrument.instrumentId) {
                    const instrumentData = {
                        id: instrument2.id,
                        name: instrument2.name,
                        label: instrument2.label,
                    }
                    userInstruments.push(instrumentData);
                }
            })
        });
        // Status
        const status = await UserStatus.findAll({ where: { userId: user.id } });

        const statusDetails = await Status.findAll();
        const userStatus = [];
        status.forEach((data) => {
            statusDetails.forEach((status2) => {
                if (status2.id === data.statusId) {
                    const statusData = {
                        id: status2.id,
                        name: status2.name,
                        label: status2.label,
                        type: status2.type
                    }
                    userStatus.push(statusData);
                }
            })
        });

        return res.status(200).json({
            error: false,
            data:
            {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                deletionDate: user.deletionDate,
                userInstruments,
                userStatus,
                userRoles
            }
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue, veuillez réessayer plus tard."
        });
    }
}


exports.ArchiveUser = async (req, res) => {
    try {
        const { id, state } = req.body;

        if (!id || isNaN(id)) {
            return res.status(400).json({
                error: true,
                message: "Requête invalide."
            });
        }

        const user = await User.findOne({ where: { id: id } });

        if (!user) {
            return res.status(404).json({
                error: true,
                message: "Utilisateur introuvable."
            });
        }

        const userData = {
            accessToken: null,
            deletionDate: state ? new Date(Date.now()) : null,
        }

        if (state && user.deletionDate) {
            return res.status(400).json({
                error: true,
                message: "L'utilisateur est déjà archivé."
            });
        } else if (!state && !user.deletionDate) {
            return res.status(400).json({
                error: true,
                message: "L'utilisateur n'est pas archivé."
            });
        }

        await user.update(userData);

        return res.status(200).json({
            error: false,
            message: state ? "L'utilisateur a bien été archivé" : "L'utilisateur a bien été désarchivé."
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue, veuillez réessayer plus tard."
        });
    }
}


exports.UserUpdate = async (req, res) => {
    try {
        const { id, firstName, lastName, email } = req.body;
        let { phoneNumber } = req.body;

        if (!id || isNaN(id)) {
            return res.status(400).json({
                error: true,
                message: "Requête invalide."
            });
        }

        const user = await User.findOne({ where: { id: id } });

        if (!user) {
            return res.status(404).json({
                error: true,
                message: "Utilisateur introuvable."
            });
        }

        const userData = {
            firstName: firstName || user.firstName,
            lastName: lastName || user.lastName,
            email: email || user.email,
            phoneNumber: phoneNumber || user.phoneNumber,
        }

        const nameRegex = /^[a-zA-Z]+$/;
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/i;

        if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
            return res.status(400).json({
                error: true,
                message: "Le nom et le prénom doivent contenir au moins 2 caractères et ne doivent pas contenir de chiffres."
            });
        }

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                error: true,
                message: "L'adresse email est invalide."
            });
        }

        if (phoneNumber) {
            const phoneData = await phone(phoneNumber, { country: 'FR' })
            if (!phoneData.isValid) {
                return res.status(400).json({
                    error: true,
                    message: 'Le numéro de téléphone est incorrect.'
                })
            } else {
                phoneNumber = phoneData.phoneNumber
            }
        }

        await user.update(userData);

        return res.status(200).json({
            error: false,
            message: "Le profil a bien été mis à jour."
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue, veuillez réessayer plus tard."
        });
    }
}


exports.PasswordUpdate = async (req, res) => {
    try {
        const { email, currentPassword, newPassword, confirmationPassword } = req.body;

        if (!email || !currentPassword || !newPassword || !confirmationPassword) {
            return res.status(400).json({ message: 'Requête invalide.' });
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/i;

        if (!passwordRegex.test(newPassword)) {
            return res.status(400).json({
                error: true,
                message: "Le mot de passe doit contenir au moins 8 caractères dont une majuscule, une minuscule, un chiffre et un caractère spécial."
            });
        }

        const user = await User.findOne({ where: { email: email } });

        const isPasswordValid = await comparePassword(currentPassword, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({
                error: true,
                message: "Le mot de passe actuel est incorrect."
            });
        }

        const encodedPassword = await encryptPassword(newPassword);

        const passwordData = {
            password: encodedPassword
        }

        await user.update(passwordData);

        return res.status(201).json({
            error: false,
            message: "Le mot de passe a bien été mis à jour."
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Une erreur s\'est produite lors de la mise à jour du mot de passe.' });
    }
}


exports.NotificationUpdate = async (req, res) => {
    try {
        const { email, notification } = req.body;

        if (!email || !["false", "true"].includes(String(notification))) {
            return res.status(400).json({ message: 'Requête invalide.' });
        }

        const user = await User.findOne({ where: { email: email } });

        const notificationData = {
            notification: notification
        }

        if (user.notification === notification) {
            return res.status(400).json({
                error: true,
                message: "Les notifications sont déjà à jour."
            });
        }
        
        await user.update(notificationData);

        return res.status(201).json({
            error: false,
            message: "Les notifications ont bien été mises à jour."
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Une erreur s\'est produite lors de la mise à jour des notifications.' });
    }
}




exports.PasswordReset = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Requête invalide.' });
        }

        const user = await User.findOne({ where: { email: email } });

        if (!user) {
            return res.status(200).json({
                error: true,
                message: "Si l'adresse email que vous avez renseigné est dans notre base de données, vous recevrez le code de réinitialisation par mail d'ici quelques minutes."
            });
        }

        const code = Math.floor(100000 + Math.random() * 900000);

        const userData = {
            passwordResetCode: code,
            passwordResetCodeExpiration: new Date(Date.now() + 15 * 60 * 1000)
        }

        await sendMail("resetPassword", { code: code }, user.email);

        await user.update(userData);

        return res.status(200).json({
            error: false,
            message: "Si l'adresse email que vous avez renseigné est dans notre base de données, vous recevrez le code de réinitialisation par mail d'ici quelques minutes."
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Une erreur s\'est produite lors de la mise à jour du mot de passe.' });
    }
}


exports.CheckResetCode = async (req, res) => {
    try {
        const { email, code } = req.body;

        if (!email || !code) {
            return res.status(400).json({ message: 'Requête invalide.' });
        }

        const user = await User.findOne({ where: { [Op.and]: { email: email, passwordResetCode: code } } });

        if (!user) {
            return res.status(400).json({
                error: true,
                message: "Le code de vérification est incorrect et ou a expiré."
            });
        }

        const expirationDate = user.passwordResetCodeExpiration;

        if (expirationDate < new Date()) {
            return res.status(401).json({
                error: true,
                message: "Le code a expiré."
            });
        }

        return res.status(201).json({
            error: false,
            message: "Le code est valide."
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Une erreur s\'est produite lors de la vérification du code.' });
    }
}

exports.PasswordResetUpdate = async (req, res) => {
    try {
        const { email, code, password } = req.body;

        if (!email || !password || !code) {
            return res.status(400).json({ message: 'Requête invalide.' });
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/i;

        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                error: true,
                message: "Le mot de passe doit contenir au moins 8 caractères dont une majuscule, une minuscule, un chiffre et un caractère spécial."
            });
        }

        const user = await User.findOne({ where: { [Op.and]: { email: email, passwordResetCode: code } } });

        if (!user) {
            return res.status(400).json({
                error: true,
                message: "Le code de vérification est incorrect et ou a expiré."
            });
        }

        const expirationDate = user.passwordResetCodeExpiration;

        if (expirationDate < new Date()) {
            return res.status(401).json({
                error: true,
                message: "Le code a expiré."
            });
        }

        const encodedPassword = await encryptPassword(password);

        const passwordData = {
            password: encodedPassword,
            passwordResetCode: null,
            passwordResetCodeExpiration: null
        }

        await user.update(passwordData);

        return res.status(201).json({
            error: false,
            message: "Le mot de passe a bien été mis à jour."
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Une erreur s\'est produite lors de la mise à jour du mot de passe.' });
    }
}
