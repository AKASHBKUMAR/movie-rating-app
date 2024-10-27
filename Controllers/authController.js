const userModel = require("./../Models/userModel");

const signup = async(req, res,next) => {
  try
  {
    const newUser = await userModel.create(req.body);
    res.status(201).json({status:"success",data:{user:newUser}});
  }
  catch(error)
  {
    res.status(400).json({status:"fail",data:error.message});
  }

}
module.exports = {signup};