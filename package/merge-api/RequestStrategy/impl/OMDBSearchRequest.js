const axios = require("../../axiosConfig");

const { omdbParser } = require("../../util/parser");

class OMDBSearchRequest {
  doRequest(data) {
    const { name, page, type } = data;
    const OMDBPageSearch = page && page > 1 ? `&page=${page}` : "";
    return axios
      .get(
        `http://www.omdbapi.com/?s=${name}&type=${type}&apikey=${
          process.env.OMDB_API_KEY
        }${OMDBPageSearch}`
      )
      .then(result => {
        return omdbParser(result.data);
      });
  }
}

module.exports = OMDBSearchRequest;
