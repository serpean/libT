const axios = require('axios');
const {axiosCache} = require('../../axiosConfig');

const {
  bookParser,
  omdbParser,
  emptyParserResponse
} = require('../../util/parser');

class SearchAllRequest {
  doRequest(data) {
    const { name, page } = data;
    const OMDBPageSearch = page && page > 1 ? `&page=${page}` : '';
    const GBPageSearch = page && page > 1 ? `&startIndex=${page * 10 - 1}` : '';
    return axios
      .all([
        axiosCache({
          url: `http://www.omdbapi.com/?s=${name}&type=game&apikey=${process.env.OMDB_API_KEY}${OMDBPageSearch}`,
          method: 'get'
        }).catch(err => console.log('GET GAMES FAIL')),
        axiosCache({
          url: `http://www.omdbapi.com/?s=${name}&type=movie&apikey=${process.env.OMDB_API_KEY}${OMDBPageSearch}`,
          method: 'get'
        }).catch(err => console.log('GET MOVIES FAIL')),
        axiosCache({
          url: `https://www.googleapis.com/books/v1/volumes?q=${name}${GBPageSearch}`,
          method: 'get'
        }).catch(err => console.log('GET BOOKS FAIL'))
      ])
      .then(([games, movies, books]) => {
        const cleanGames = games ? omdbParser(games.data) : emptyParserResponse();
        const cleanMovies = movies ? omdbParser(movies.data) : emptyParserResponse();
        const cleanBooks = books ? bookParser(books.data) : emptyParserResponse();

        const itemsOutput = [...cleanBooks.search, ...cleanMovies.search, ...cleanGames.search]
          .sort((a, b) => a.title > b.title);
        const lengthsOutput = [cleanGames.totalResults, cleanBooks.totalResults, cleanMovies.totalResults]
          .reduce((acc, curr) => (curr && curr > acc ? curr : acc), 0);

        const responseOutput = [cleanGames.response, cleanBooks.response, cleanMovies.response].find(x => x);

        return { search: [...itemsOutput], totalResults: lengthsOutput, response: responseOutput ? true : false };
      })
      .catch(err => {
        console.error(err);
      });
  }
}

module.exports = SearchAllRequest;
