exports.createParser = type => {
  let parser;
  switch (type) {
    case "book":
      parser = this.bookParser;

      break;
    case "movie":
    case "book":
      parser = this.omdbParser;
      break;
    default:
      const error = new Error("Unhandler parser");
      error.statusCode = 404;
      throw error;
  }
  return parser;
};

exports.bookParser = data => {
  if (!data.items || data.totalItems <= 0)
    return { search: [], totalResults: data.totalItems, response: false };
  return {
    totalResults: data.totalItems,
    response: true,
    search: data.items.map(element => {
      const { imageLinks } = element.volumeInfo;
      return {
        title: element.volumeInfo.title,
        authors: element.volumeInfo.authors,
        id: `${element.id}__google`,
        type: "book",
        image: imageLinks && imageLinks.thumbnail ? imageLinks.thumbnail : "N/A"
      };
    })
  };
};

exports.omdbParser = data => {
  if (data.Response === "False")
    return { search: [], totalResults: 0, response: false };
  return {
    totalResults: data.totalResults,
    response: true,
    search: data.Search.map(element => {
      return {
        title: element.Title,
        id: `${element.imdbID}__omdb`,
        type: element.Type,
        image: element.Poster
      };
    })
  };
};
