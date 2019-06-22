const axios = require("axios");

const AppApi = axios.create({
    baseURL: `${process.env.APP_API}`
})

module.exports =  AppApi;