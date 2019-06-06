const axios = require("axios");
const axiosCache = require("../../axiosConfig");

const { bookParser, omdbParser } = require("../../util/parser");

class SearchAllRequest {
  doRequest(data) {
    const { name, page } = data;
    const OMDBPageSearch = page && page > 1 ? `&page=${page}` : "";
    const GBPageSearch = page && page > 1 ? `&startIndex=${page * 10 - 1}` : "";
    return axios
      .all([
        axiosCache.get(
          `http://www.omdbapi.com/?s=${name}&type=game&apikey=${
            process.env.OMDB_API_KEY
          }${OMDBPageSearch}`
        ),
        axiosCache.get(
          `http://www.omdbapi.com/?s=${name}&type=movie&apikey=${
            process.env.OMDB_API_KEY
          }${OMDBPageSearch}`
        ),
        axiosCache.get(
          `https://www.googleapis.com/books/v1/volumes?q=${name}${GBPageSearch}`
        )
      ])
      .then(
        axios.spread((games, movies, books) => {
          const cleanGames = omdbParser(games.data);
          const cleanMovies = omdbParser(movies.data);
          const cleanBooks = bookParser(books.data);

          const itemsOutput = [
            ...cleanBooks.search,
            ...cleanMovies.search,
            ...cleanGames.search
          ].sort((a, b) => a.title > b.title);
          const lengthsOutput = [
            cleanGames.totalResults,
            cleanBooks.totalResults,
            cleanMovies.totalResults
          ].reduce((acc, curr) => (curr && curr > acc ? curr : acc), 0);

          const responseOutput = [
            cleanGames.response,
            cleanBooks.response,
            cleanMovies.response
          ].find(x => x);

          return {
            search: [...itemsOutput],
            totalResults: lengthsOutput,
            response: responseOutput ? true : false
          };
        })
      );
  }
}

module.exports = SearchAllRequest;
