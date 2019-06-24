const axios = require('../../axiosConfig');

class GBRequest {
  async doRequest(id) {
    try {
      const response = await axios({
        url: `https://www.googleapis.com/books/v1/volumes?q=${id}`,
        method: 'get'
      });

      const { totalItems, items } = response.data;
      if (totalItems < 1) {
        const error = new Error('Invalid ID');
        error.statusCode = 404;
        throw error;
      }

      return {
        title: items[0].volumeInfo.title,
        authors: items[0].volumeInfo.authors,
        publishDate: items[0].volumeInfo.publishDate,
        description: items[0].volumeInfo.description,
        image: items[0].volumeInfo.imageLinks
          ? items[0].volumeInfo.imageLinks.thumbnail.replace('http', 'https')
          : 'N/A',
        response: true
      };
    } catch (err) {
      return {
        response: false,
        message: 'GBRequest fail'
      };
    }
  }
}

module.exports = GBRequest;
