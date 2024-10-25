// IMPORT NODE PACKAGES
const express = require("express");
const morgan = require("morgan");

const PORT = 3500;

// CALLING THE FUNCTION
const app = express();


const movieRouter = require("./Routes/MovieRoutes");


app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("./Public"));

app.use("/api/v1/movies", movieRouter);

app.listen(PORT,()=>{console.log("Server has started in localhost:3500")});