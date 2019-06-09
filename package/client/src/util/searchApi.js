import axios from "axios";

const SearchApi = axios.create({
    baseURL: `${process.env.REACT_APP_SEARCH_API}`
})

export default SearchApi;