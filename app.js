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


// CALLING THE FUNCTION
const app = express();


const movieRouter = require("./Routes/MovieRoutes");


app.use(express.json());
if(process.env.NODE_ENV === "Development")
  app.use(morgan("dev"));
app.use(express.static("./Public"));

app.use("/api/v1/movies", movieRouter);

app.listen(PORT,()=>{console.log(`Server has started in localhost:${process.env.PORT}`)});