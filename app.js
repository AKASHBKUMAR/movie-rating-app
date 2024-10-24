// IMPORT NODE PACKAGES
const express = require("express");
const fileSystem = require("node:fs");


const PORT = 3500;
// CALLING THE FUNCTION
const app = express();
const movies = JSON.parse(
  fileSystem.readFileSync("./Data/movies.json","utf-8")
);


app.use(express.json());


// GET - To Get all the Movie (/api/v1/movies)
app.get("/api/v1/movies" ,(req, res)=>{
  res.status(200).json({
    status:"success",
    data:movies
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
    fileSystem.writeFile("./Data/movies.json",JSON.stringify(movies),(error)=>{
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

  fileSystem.writeFile("./Data/movies.json",JSON.stringify(movies),(error)=>{
    res.status(201).json({status:"success",data:{movie:newMovie}});
  })
})







app.listen(PORT,()=>{console.log("Server has started in localhost:3500")});