const { body } = require("express-validator");

const userValidator = [
    body(["email", "password"])
        .exists()
        .trim()
        .isLength({ min: 5 })
        .withMessage("El password debe contener al menos 5 caracteres"),
    body("email")
        .exists()
        .normalizeEmail()
        .isEmail()
        .withMessage("Ingrese un email válido"),
    body("password").exists().trim(),
];


module.exports = {
    userValidator,
};