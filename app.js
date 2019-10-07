const express = require("express"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  dotenv = require("dotenv"),
  Recipe = require("./models/recipe");

dotenv.config();

const app = express();
// MONGODB_URI=mongodb://new-user_01:noIOGRtJOjUaxK7J@adopt-a-tree-chatbot-shard-00-00-dxpxl.mongodb.net:27017,adopt-a-tree-chatbot-shard-00-01-dxpxl.mongodb.net:27017,adopt-a-tree-chatbot-shard-00-02-dxpxl.mongodb.net:27017/test?ssl=true&replicaSet=adopt-a-tree-chatbot-shard-0&authSource=admin&retryWrites=true&w=majority
// To be deleted soon ^^^
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas!");
  })
  .catch(error => {
    console.log("Unable to connect to MongoDB Atlas!");
    console.error(error);
  });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());

app.post("/api/recipes", (req, res, next) => {
  const recipe = new Recipe({
    title: req.body.title,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    difficulty: req.body.difficulty,
    time: req.body.time
  });

  recipe
    .save()
    .then(() => {
      res.status(201).json({
        message: "Post saved successfully!"
      });
    })
    .catch(error => {
      console.error(error);

      res.status(400).json({
        error: error
      });
    });
});

app.get("/api/recipes/:id", (req, res, next) => {
  Recipe.findOne({
    _id: req.params.id
  })
    .then(recipe => {
      res.status(200).json(recipe);
    })
    .catch(error => {
      console.error(error);

      res.status(404).json({
        error: error
      });
    });
});

app.put("/api/recipes/:id", (req, res, next) => {
  const recipe = new Recipe({
    _id: req.params.id,
    title: req.body.title,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    difficulty: req.body.difficulty,
    time: req.body.time
  });

  Recipe.updateOne({ _id: req.params.id }, recipe)
    .then(() => {
      res.status(201).json({
        message: "Recipe updated successfully!"
      });
    })
    .catch(error => {
      console.error(error);

      res.status(400).json({
        error: error
      });
    });
});

app.delete("/api/recipes/:id", (req, res, next) => {
  Recipe.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: "Deleted!"
      });
    })
    .catch(error => {
      console.error(error);

      res.status(400).json({
        error: error
      });
    });
});

app.use("/api/recipes", (req, res, next) => {
  Recipe.find()
    .then(recipes => {
      res.status(200).json(recipes);
    })
    .catch(error => {
      console.error(error);

      res.status(400).json({
        error: error
      });
    });
});

module.exports = app;
