const express = require('express');
const apiRouter = express.Router();
const apiService = require('../services/api');

apiRouter.post("/changepassword", (req, res) => {
    apiService.postChangePassword(req, (err, result) => {
        apiService.response(res, err, result);
    });
});

module.exports = apiRouter;