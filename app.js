// IMPORT NODE PACKAGES
const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config({path:"./config.env"});

const PORT = process.env.PORT || 3500;

// CALLING THE FUNCTION
const app = express();

// console.log(app.get('env'))
// console.log(process.env);

const movieRouter = require("./Routes/MovieRoutes");


app.use(express.json());
if(process.env.NODE_ENV === "Development")
  app.use(morgan("dev"));
app.use(express.static("./Public"));

app.use("/api/v1/movies", movieRouter);

app.listen(PORT,()=>{console.log(`Server has started in localhost:${process.env.PORT}`)});