const UserModel = require('../models/user');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');

const signupController = (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    console.log(errors);
    return res.json({message: errors.array()[0].msg});
  }

  const {name, email, password} = req.body;

  bcrypt.hash(password, 7).then( hashedPassword => {

    const user = new UserModel({name, email, password: hashedPassword});

    user.save().then( user => {
      res.json({"message": "Sign up successful", "data": {name: user.name, email: user.email}});
    }).catch(err => console.log(err));
  }).catch(err => console.log(err));
  
}

const signinController = async (req, res) => {
  //find email with user in the database
  try{
    const errors = validationResult(req);
    if(!errors.isEmpty())
    { return res.json({message: errors.array()[0].msg});}
    const {email, password} = req.body;
    //find user
    const user = await UserModel.findOne({email});
    if(!user){
      return res.json({message: "User does not exist"});
    }
    //compare passwords
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) {
      return res.json({message: "User info incorrect"});
    }
    return res.json({message: "user signed in"});
  }catch(error){
    res.json({message: "Wrong input. Please try again"});
  }
  
}

module.exports = {
  signupController,
  signinController
}