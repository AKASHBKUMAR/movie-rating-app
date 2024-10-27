const movieModel = require("./../Models/MovieModel");


const getHighestRated = (req, res, next)=>{
  try{
    req.query.limit = 10;
    req.query.sort = "-rating";
    next();
  }
  catch(error)
  {
    res.status(400).json({status:"fail",data:error.message});
  }
}

// GET all Movies
const getAllMovies = async(req, res) => {
  try
  { 
    const excludeFields = ["sort", "page", "limit", "fields"];

    let shallowQueryObject = { ...req.query };

    excludeFields.forEach((element) => {delete shallowQueryObject[element];});

   //Advance Filtering
    let shallowQueryObjectString = JSON.stringify(shallowQueryObject);
    
    shallowQueryObjectString = shallowQueryObjectString.replace(/\b(lt|lte|gt|gte)\b/g,(match) => `$${match}`);
    
    shallowQueryObject = JSON.parse(shallowQueryObjectString);

    //GETTING RESULTS FROM THE MONGODB AND SORTING
    const data = movieModel.find(shallowQueryObject);

    // SORTING LOGIC IS DONE HERE
    req.query.sort? data.sort(req.query.sort.split(",").join(" ")): data.sort("-totalRatings");

    //Limiting the Fields
    req.query.fields ? data.select(req.query.fields.split(",").join(" ")): data.select("name rating releaseYear price coverImage");

   //Paginate
    const page = req.query.page ? req.query.page * 1 : 1;
    const limit = req.query.limit ? req.query.limit * 1 : 10;
    const skip = (page - 1) * 10;
    if (req.query.page) 
    {
      if (skip >= (await movieModel.countDocuments())) 
      {
        throw new Error("There is no data present");
      }
    }
    const movies = await data.skip(skip).limit(limit);
    res.status(200).json({ status: "success", length: movies.length , data: { movie: movies } });
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
const getMovieStats = async(req, res) =>{
  try
  {
    const stats = await movieModel.aggregate([{$match:{rating:{$gte:4.5}}}]);
    res.status(200).json({status:"success",count:stats.length,data:stats});
  }
  catch(error)
  {
    res.status(404).json({status:"fail",data:error.message});
  }
}

module.exports = {
  getHighestRated,
  getAllMovies,
  getMovieById,
  createNewMovie: createNewMovie,
  deleteMovieById,
  UpdateMovieById,
  getMovieStats
};