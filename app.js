// IMPORT NODE PACKAGES
const express = require("express");

const PORT = 3500;
// CALLING THE FUNCTION
const app = express();
app.get("/",(req,res)=>{
  res.status(200).json({message:"Server started successfully",status:200});
})

app.listen(PORT,()=>{console.log("Server has started in localhost:3500")});