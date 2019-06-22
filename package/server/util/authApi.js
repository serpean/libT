const axios = require("axios");

const AuthApi = axios.create({
    baseURL: `${process.env.AUTH_API}`
})

module.exports =  AuthApi;