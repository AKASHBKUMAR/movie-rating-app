const movieModel = require("./../Models/MovieModel");


//Validating whether the Movie has a Object.
// const validateBody =(req, res,next)=>{
//   if( !req.body.name || !req.body.duration)
//   {
//     return res.status(400).json({status:"Failure",message:"Not a Valid Movie Data"});
//   }
//   next();
// }

// GET all Movies
const getAllMovies = async(req, res) => {
  try
  {
    // const exludeFields = ["sort","page","limit","fields"];
    // const queryObject = {...req.query};
    // exludeFields.forEach((element)=>{delete queryObject[element]});
    // console.log(queryObject);
    let queryString = JSON.stringify(req.query);
    queryString = queryString.replace(/\b(lt|lte|gt|gte)\b/g,(match)=>`$${match}`)
    const queryObject = JSON.parse(queryString);
    console.log(queryObject);
    const movies = await movieModel.find(queryObject);

    res.status(200).json({status:"success",length:movies.length,data:{movies}});
  }
  catch(error)
  {
    res.status(404).json({status:"fail",data:{movie:error.message}});
  }
};

// ADD New Movie
const createNewMovie = async(req, res) => {
  try
  {
    const movie = await movieModel.create(req.body);
    res.status(201).json({status:"success",data:{movie}});
  }
  catch(error)
  {
    res.status(400).json({status:"fail",message:error.message});
  }
};

// GET - Movie By ID
const getMovieById = async(req, res) => {
  try{
    //const movie = await movieModel.find({__id:req.params.id *1});
    const movie = await movieModel.findById(req.params.id);
    res.status(200).json({status:"success",data:{movie}});
  }
  catch(error)
  {
    res.status(404).json({status:"fail",data:{movie:error.message}});
  }
};

//PATCH - Update Movie By ID:
const UpdateMovieById = async(req, res) => {
  try{
    const movie = await movieModel.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
    res.status(200).json({status:"success",data:{movie}});
  }
  catch(error)
  {
    res.status(404).json({status:"fail",data:{message:error.message}});
  }
};


const deleteMovieById = async (req, res) => {
  try{
    await movieModel.findByIdAndDelete(req.params.id);
    res.status(204).json({status:"success",data:null});
  }
  catch(error)
  {
    res.status(404).json({ status: "success", message:error.message });
  }
};

module.exports = {getAllMovies,getMovieById,createNewMovie: createNewMovie,deleteMovieById,UpdateMovieById}