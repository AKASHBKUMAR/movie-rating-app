const fileSystem = require("node:fs");

const movies = JSON.parse(
  fileSystem.readFileSync("./Data/Movies.json", "utf-8")
);

// GET all Movies
exports.getAllMovies = (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAt: req.requestedAt,
    data: movies,
  });
};

// ADD New Movie
exports.addNewMovie = (req, res) => {
  const newId = movies[movies.length - 1].id + 1;
  const newMovie = Object.assign({ id: newId }, req.body);
  movies.push(newMovie);
  fileSystem.writeFile(
    "./Data/Movies.json",
    JSON.stringify(movies),
    (error) => {
      res.status(201).json({ status: "success", data: { movie: newMovie } });
    }
  );
};

// GET - Movie By ID
exports.getMovieById = (req, res) => {
  const id = req.params.id * 1;
  const movieById = movies.find((element) => {
    if (element.id === id) return element;
  });
  if (movieById)
    return res.status(200).json({
      status: "success",

      data: { movie: movieById },
    });
  return res.status(404).json({
    status: "Failed",
    data: { movie: `No Movie Object is available in the ID ${id}` },
  });
};

//PATCH - Update Movie By ID:
exports.UpdateMovieById = (req, res) => {
  const movieID = req.params.id * 1;
  const movieToBeUpdated = movies.find((element) => {
    if (element.id === movieID) return element;
  });
  if (movieToBeUpdated) {
    const index = movies.indexOf(movieToBeUpdated);
    const updatedMovie = Object.assign(movieToBeUpdated, req.body);
    movies[index] = updatedMovie;
    fileSystem.writeFile(
      "./Data/Movies.json",
      JSON.stringify(movies),
      (error) => {
        if (error) console.log(error);
        return res
          .status(200)
          .json({ status: "success", data: { movie: updatedMovie } });
      }
    );
  } else
    return res.status(404).json({status:"Failure",data:{movie:`No Movie with the available ID ${movieID}`}});
};


exports.deleteMovieById = (req, res) => {
  const movieID = req.params.id * 1;
  const movieToBeDeleted = movies.find((element) => {
    if (element.id === movieID) return element;
  });
  if (!movieToBeDeleted)
    return res.status(404).json({
      status: `Failure`,
      data: { movie: `No Movie available with the ID ${movieID}` },
    });
  const index = movies.indexOf(movieToBeDeleted);
  movies.splice(index, 1);
  fileSystem.writeFile("./Data/Movies.json", JSON.stringify(movies), () => {
    return res.status(204).json({ status: "success", data: { movie: null } });
  });
};
