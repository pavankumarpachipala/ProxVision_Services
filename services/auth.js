const express = require('express');
const moment = require("moment");
const apiService = require("./api");
const twillio = require("../utilities/twillio");

exports.login = (data, callback) => {
    try {
        twillio.sendOTP(data.query.mobilenumber);
    } catch (error) {
        console.log("login Exception", error);
    }
}

