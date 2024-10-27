const mongoose =require("mongoose");
const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is a Required Field!"],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Description is a required Field!"],
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, "Duration is a required Field"],
  },
  rating: {
    type: Number,
  },
  totalRatings: {
    type: Number,
  },
  releaseYear: {
    type: Number,
    required: [true, "Release Year is a required Field"],
  },
  releaseDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select:false
  },
  genres: {
    type: [String],
    required: [true, "Genre is a Required Field!"],
  },
  coverImage: {
    type: String,
    required: [true, "cover Image is a Required Field!"],
  },
  actors: {
    type: [String],
    required: [true, "Actors is a Required Field!"],
  },
  price: {
    type: Number,
    required: [true, "Price is a Required Field!"],
  },
});

const Movie = mongoose.model("Movies", movieSchema);
module.exports = Movie;
