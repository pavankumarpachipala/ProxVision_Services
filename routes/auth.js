const express = require('express');
const authRouter = express.Router();
const apiService = require('../services/api');
const authService = require('../services/auth');

authRouter.get("/send-otp", (req, res) => {
    authService.login(req, (err, result) => {
        apiService.response(res, err, result);
    });
});

module.exports = authRouter;