// IMPORT NODE PACKAGES
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({path:"./config.env"});

const PORT = process.env.PORT || 3500;
mongoose.connect(process.env.CONNECTION_STRING,{useNewUrlParser:true})
  .then((connection)=>{console.log("DB Connection Successful")})
  .catch((error)=>{console.log(error)});

const movieSchema = new mongoose.Schema({
  name:{type:String,required:[true,"Name is a Required Field"],unique:true} ,
  descrption: String,
  duration:{type:Number,required:[true,"Duration is a required Field"]},
  ratings: {type:Number,default:1.0}

})

const Movie = mongoose.model("Movies",movieSchema);
// CALLING THE FUNCTION
const app = express();

const testMovie = new Movie({name:"Peaky Blinders",description:"Action Packed Brutal way of potraying Shelby",duration:120,ratings:5})
testMovie.save().then((document)=>{console.log(document)}).catch((error)=>{console.log(error)});

const movieRouter = require("./Routes/MovieRoutes");


app.use(express.json());
if(process.env.NODE_ENV === "Development")
  app.use(morgan("dev"));
app.use(express.static("./Public"));

app.use("/api/v1/movies", movieRouter);

app.listen(PORT,()=>{console.log(`Server has started in localhost:${process.env.PORT}`)});