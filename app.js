// IMPORT NODE PACKAGES
const express = require("express");
const fileSystem = require("node:fs");
const mrogan = require("morgan");


const PORT = 3500;
// CALLING THE FUNCTION
const app = express();
const movies = JSON.parse(
  fileSystem.readFileSync("./Data/Movies.json","utf-8")
);


app.use(express.json());
app.use((req, res, next) => {
  req.requestedAt = new Date().toISOString();
  next();
});


// GET - To Get all the Movie (/api/v1/movies)
app.get("/api/v1/movies" ,(req, res)=>{
  res.status(200).json({
    status: "success",
    requestedAt: req.requestedAt,
    data: movies,
  });
})

//GET Request - Get Movie by ID(/api/v1/movies/:id)
app.get("/api/v1/movies/:id",(req, res)=>{
  const id = req.params.id * 1;
  const movieById = movies.find((element)=>{if(element.id === id) return element});
  if(movieById)
    return res.status(200).json(
      {
        status:"success",
        
        data:{movie:movieById
      }
    });
  return res.status(404).json({status:"Failed",data:{movie:`No Movie Object is available in the ID ${id}`}});
})

//PATCH Request - Update the Movie by ID(/api/v1/movies/:id)
app.patch("/api/v1/movies/:id",(req, res)=>{
  const movieID = req.params.id * 1;
  const movieToBeUpdated = movies.find((element)=>{if(element.id === movieID) return element});
  if(movieToBeUpdated)
  {
    const index = movies.indexOf(movieToBeUpdated);
    const updatedMovie = Object.assign(movieToBeUpdated,req.body)
    movies[index] = updatedMovie;
    fileSystem.writeFile("./Data/Movies.json",JSON.stringify(movies),(error)=>{
      if(error)
        console.log(error);
      return res.status(200).json({status:"success",data:{movie:updatedMovie}})
    })
  }
  else
    return res.status(404).send(`No Movie with the available ID ${movieID}`);

  
})


//POST Request - To add a New Movie(/api/v1/movies)
app.post("/api/v1/movies",(req,res) =>{

  const newId = movies[(movies.length-1)].id + 1;

  const newMovie = Object.assign({"id":newId},req.body);

  movies.push(newMovie);

  fileSystem.writeFile("./Data/Movies.json",JSON.stringify(movies),(error)=>{
    res.status(201).json({status:"success",data:{movie:newMovie}});
  })
})

//DELETE Request - To Delete a Movie(/api/v1/movies:id)
app.delete("/api/v1/movies/:id",(req, res)=>{
    const movieID = req.params.id * 1;
    const movieToBeDeleted = movies.find((element) => {
      if(element.id === movieID) 
        return element;
    });
    if(!movieToBeDeleted)
      return res.status(404).json({status:`Failure`,data:{movie:`No Movie available with the ID ${movieID}`}});
    const index = movies.indexOf(movieToBeDeleted);
    movies.splice(index,1);
    fileSystem.writeFile("./Data/Movies.json",JSON.stringify(movies),()=>{
      return res.status(204).json({status:"success",data:{movie:null}});
    })
    
    
})





app.listen(PORT,()=>{console.log("Server has started in localhost:3500")});