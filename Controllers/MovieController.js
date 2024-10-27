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
    const objects = ["sort","page"]
    let queryString = JSON.stringify(req.query);
    queryString = queryString.replace(/\b(lt|lte|gt|gte)\b/g,(match)=>`$${match}`);
    const queryObject = JSON.parse(queryString);
    if(req.query.sort || req.query.fields)
    {
      delete  queryObject.sort;
      delete queryObject.fields;
    }
    let query = movieModel.find(queryObject);

    //SORTING IF QUERY STRING HAS SORT PROPERTY
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    }
    else
    {
      query = query.sort("-createdAt");
    }
    if(req.query.fields)
    {
      const fields = req.query.fields.split(",").join(" ");
      console.log(fields);
      query = query.select(fields);
    }
    else
    {
      query = query.select("-__v ")
    }
    const movies = await query;

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