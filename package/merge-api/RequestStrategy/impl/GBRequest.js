const axios = require("../../axiosConfig");

class GBRequest {
  doRequest(id) {
    return axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${id}`)
      .then(response => {
        const { totalItems, items } = response.data;
        if (totalItems < 1) {
          const error = new Error("Invalid ID");
          error.statusCode = 404;
          throw error;
        }

        return {
          title: items[0].volumeInfo.title,
          authors: items[0].volumeInfo.authors,
          publishDate: items[0].volumeInfo.publishDate,
          description: items[0].volumeInfo.description,
          image: items[0].volumeInfo.imageLinks
            ? items[0].volumeInfo.imageLinks.thumbnail
            : "N/A",
          response: true
        };
      });
  }
}

module.exports = GBRequest;
