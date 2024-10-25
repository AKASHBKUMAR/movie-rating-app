const fileSystem = require("node:fs");

const movies = JSON.parse(
  fileSystem.readFileSync("./Data/Movies.json", "utf-8")
);

const checkID = (req, res,next,value)=>{
  const movie = movies.find((element)=>
    {
      if(element.id === value *1)
        return element;
    })
    if(!movie)
    {
      return res.status(404).json({status:"Failure",data:{movie:`No Movie Found with the ID:  ${value}`}});
    }
    next();
}
//Validating whether the Movie has a Object.
const validateBody =(req, res,next)=>{
  if( !req.body.name || !req.body.releaseDate || !req.body.duration)
  {
    return res.status(400).json({status:"Failure",message:"Not a Valid Movie Data"});
  }
  next();
}





// GET all Movies
const getAllMovies = (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAt: req.requestedAt,
    data: movies,
  });
};

// ADD New Movie
const createNewMovie = (req, res) => {
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
const getMovieById = (req, res) => {
  const id = req.params.id * 1;
  const movieById = movies.find((element) => {
    if (element.id === id) return element;
  });
  return res.status(200).json({
      status: "success",
      data: { movie: movieById },
    });
  // return res.status(404).json({
  //   status: "Failed",
  //   data: { movie: `No Movie Object is available in the ID ${id}` },
  // });
};

//PATCH - Update Movie By ID:
const UpdateMovieById = (req, res) => {
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
  }
};


const deleteMovieById = (req, res) => {
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

module.exports = {getAllMovies,getMovieById,createNewMovie: createNewMovie,deleteMovieById,UpdateMovieById,checkID,validateBody}