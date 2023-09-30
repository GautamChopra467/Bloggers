const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const { SIGN_UP, LOGIN, USER } = require("../utils/constants").ROUTES.AUTH;

const { signup, login } = require("../controllers/authControllers");

const { CheckUser } = require("../middlewares/AuthMiddleware");

const ErrorHandler = require("../ErrorHandling/AuthHandling");

router.route(SIGN_UP).post(ErrorHandler.register, signup);

router.route(LOGIN).post(ErrorHandler.login, login);

router.route(USER).post(CheckUser);

module.exports = router;