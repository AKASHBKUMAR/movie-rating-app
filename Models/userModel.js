const mongoose = require("mongoose");
const validator = require("validator")

const userSchema = new mongoose.Schema({
  name:{
    type:String,
    minlength:[3,"Length of User Name should be more than 3 Characters"],
    maxlength:[100,"Length of User Name should be more than 3 characters"],
    required:[true,"Please Enter your Name"],
    trim:true
  },
  email:{
    type:String,
    required:[true,"Please Enter a Valid Email ID"],
    unique:[true,"This Email is already registered"],
    lowercase:true,
    validator:[validator.isEmail,"Please enter a Valid Email"],
    trim:true
  },
  photo:{
    type:String
  },
  password:{
    type:String,
    minlength:[8,"The Password must be minimum of 8 Characters"],
    required:true,
    trim:true
  },
  confirmPassword:{
    type:String,
    required:[true,"Please Confirm your Password"],
    validate:{
        validator:function(value) {
          return val === this.password;
        },
        message:"Password and Confirm Password Doesn't match"
    }
  }
})

const userModel =   mongoose.model("Users",userSchema)
module.exports = userModel;