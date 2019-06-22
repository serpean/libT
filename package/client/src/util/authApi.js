import axios from "axios";

const AppApi = axios.create({
    baseURL: `${process.env.REACT_APP_AUTH_API}`
})

export default AppApi;