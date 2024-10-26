const mongoose =require("mongoose");
const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is a Required Field"],
    unique: true,
  },
  description: String,
  duration: { type: Number, required: [true, "Duration is a required Field"] },
  rating: { type: Number, default: 1.0 },
});

const Movie = mongoose.model("Movies", movieSchema);
module.exports = Movie;
