import axios from "axios";

const AppApi = axios.create({
    baseURL: `${process.env.REACT_APP_APP_API}`
})

export default AppApi;