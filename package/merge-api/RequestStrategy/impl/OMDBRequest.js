const axios = require('../../axiosConfig');

class OMDBRequest {
  async doRequest(id) {
    const response = await axios.get(
      `http://www.omdbapi.com/?i=${id}&plot=full&apikey=${
        process.env.OMDB_API_KEY
      }`
    );
    const { Response } = response.data;
    if (Response === 'False') {
      const error = new Error('Invalid ID');
      error.statusCode = 404;
      throw error;
    }

    return {
      title: response.data.Title,
      authors:
        response.data.Production !== 'N/A' ? [response.data.Production] : [],
      publishDate: response.data.Released,
      description: response.data.Plot,
      image: response.data.Poster,
      response: true
    };
  }
}

module.exports = OMDBRequest;
