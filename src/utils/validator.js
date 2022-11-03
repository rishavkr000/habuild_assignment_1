const mongoose = require("mongoose")

let isValidRequestBody = function (body) {
    if (Object.keys(body).length === 0) return false;
    return true;
}

let isValid = (value) => {
    if (typeof value === 'undefined' || value === null) return true
    if (typeof value === 'string' && value.trim().length === 0) return true
    return false;
}

let isValidEmail = function (email) {
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return emailRegex.test(email)
}

let isValidPassword = function (password) {
    let passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/
    return passwordRegex.test(password)
}

let isValidRanking = function (ranking) {
    let rankingRegex = /\d{1,2}(?!\d)|100/
    return rankingRegex.test(ranking)
}

module.exports = {
    isValidRequestBody,
    isValid,
    isValidEmail,
    isValidPassword,
    isValidRanking
}