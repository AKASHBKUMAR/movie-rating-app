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
  res.status(200).json(
  {
    status:"success",
    data:movies
  });
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