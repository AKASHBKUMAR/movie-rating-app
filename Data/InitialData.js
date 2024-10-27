const fileSystem = require("node:fs");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const movieModel = require("./../Models/MovieModel");

dotenv.config({path:"./../config.env"});

mongoose.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true }).then(()=>{
  console.log("Connected to Mongo DB")
}).catch((error)=>{console.log(error)});

const movies = JSON.parse(fileSystem.readFileSync("./Movies.json","utf-8"));
console.log(movies.length);
try{
  movies.map((element)=>{movieModel.create(element)});
}
catch(error)
{
  console.log(error.message);
}

