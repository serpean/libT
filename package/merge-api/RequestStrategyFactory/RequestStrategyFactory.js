const RequestStrategy = require("../RequestStrategy/RequestStrategy");
const GBRequest = require("../RequestStrategy/impl/GBRequest");
const OMDBRequest = require("../RequestStrategy/impl/OMDBRequest");
const SearchAllRequest = require("../RequestStrategy/impl/SearchAllRequest");
const GBSearchRequest = require("../RequestStrategy/impl/GBSearchRequest");
const OMDBSearchRequest = require("../RequestStrategy/impl/OMDBSearchRequest");

class RequestStrategyFactory {
  createRequestStrategy(type) {
    const requestStrategy = new RequestStrategy();
    switch (type) {
      case "book":
        requestStrategy.request = new GBRequest();
        break;
      case "movie":
      case "game":
        requestStrategy.request = new OMDBRequest();
        break;
      case "search-all":
        requestStrategy.request = new SearchAllRequest();
        break;
      case "search-book":
        requestStrategy.request = new GBSearchRequest();
        break;
      case "search-game":
      case "search-movie":
        requestStrategy.request = new OMDBSearchRequest();
        break;
      default:
        const error = new Error("Not supported strategy");
        error.statusCode = 422;
        throw error;
    }
    return requestStrategy;
  }
}

module.exports = RequestStrategyFactory;
