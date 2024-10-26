const express = require("express");
const {getAllMovies,getMovieById,createNewMovie,deleteMovieById,UpdateMovieById} = require("./../Controllers/MovieController");


//Defining a Router
const router = express.Router();

// GET - To Get all the Movie (/api/v1/movies) and POST Request - To add a New Movie(/api/v1/movies)
router
  .get("/", getAllMovies)
  .post("/", createNewMovie);

//GET Request - Get Movie by ID(/api/v1/movies/:id) && PATCH Request - Update the Movie by ID(/api/v1/movies/:id) && DELETE Request - To Delete a Movie(/api/v1/movies:id)
router
  .get("/:id", getMovieById)
  .patch("/:id", UpdateMovieById)
  .delete("/:id", deleteMovieById);

module.exports = router;
