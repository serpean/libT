const express = require("express");

const RequestStrategyFactory = require("./RequestStrategyFactory/RequestStrategyFactory");
const port = process.env.PORT || 3030;

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
  next();
});

app.get("/:type/:id", async (req, res, next) => {
  const type = req.params.type;
  const id = req.params.id;
  try {
    const factory = new RequestStrategyFactory();
    const requestStrategy = factory.createRequestStrategy(type);
    const result = await requestStrategy.doRequest(id);
    res.status(200).json(result);
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
});

app.get("/", async (req, res, next) => {
  const name = req.query.name;
  const type = req.query.type ? `search-${req.query.type}` : "search-all";
  const page = req.query.page;

  try {
    const factory = new RequestStrategyFactory();
    const requestStrategy = factory.createRequestStrategy(type);
    const result = await requestStrategy.doRequest({
      name: name,
      type: req.query.type,
      page: page
    });
    res.status(200).json(result);
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
});

app.get("/prueba", async (req, res, next) => {
  res.status(200).json({message: "Hola"});
  }
);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode).json({ message: err.message, response: false });
});

app.listen(port, res => console.log(`Server on in port:${port}`));
