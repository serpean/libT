const axios = require("../../axiosConfig");

const { bookParser } = require("../../util/parser");

class GBSearchRequest {
  doRequest(data) {
    const { name, page } = data;
    const GBPageSearch = page && page > 1 ? `&startIndex=${page * 10 - 1}` : "";

    return axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${name}${GBPageSearch}`
      )
      .then(books => {
        return bookParser(books.data);
      });
  }
}

module.exports = GBSearchRequest;
