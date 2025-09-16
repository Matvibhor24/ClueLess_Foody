const User = require("../models/UserModel")
const bcrypt = require("bcrypt")
const {validationResult}  = require("express-validator")
const jwt = require("jsonwebtoken")

const loginController = async (req , res) => {
    const {email, password} = req.body;

    let existingUser;
    try{
        existingUser = await User.findOne({email : email});
    }
    catch(err){
        res.status(500).json({ error : err.message})
        return 
    }

    if(!existingUser){
        res.status(500).json({ error : "user does not exist" })
        return 
    }

    let validPassword ;

    try{
        validPassword = await bcrypt.compare(password,existingUser.password);
    }catch(err){
        res.status(500).json({ error : err.message});
        return 
    }

    if(!validPassword){
        res.status(500).json({error : "password is incorrect"});
        return
    }

    const token = jwt.sign({_id : existingUser._id}, process.env.SECRET_STRING) ;

    res.status(200).json({ username : existingUser.username , email : existingUser.email , token})
}


const signupController = async (req , res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.status(422).json(errors);
        return 
    }

    const {email, username , password} = req.body;

    let existingUser;

    try{
        existingUser = await User.findOne({email : email});
    }catch(err){
        res.status(500).json({error : err.message});
        return 
    }

    if(existingUser){
        res.status(403).json({message : "User already exist"});
        return 
    }

    let hashedPassword;
    try{
        hashedPassword = await bcrypt.hash(password,12);
    }
    catch(err){
        res.status(500).json({error : err.message});
        return 
    }

    const newUser = User({
        username,
        email,
        password : hashedPassword
    })

    try{
        await newUser.save();
    }catch(err){
        res.status(500).json({message : "Couldn't create user , try again later"})
        return 
    }

     const token = jwt.sign({_id : existingUser._id}, process.env.SECRET_STRING) 

    res.status(201).json({username : newUser.username , email : newUser.email , token })  
}

module.exports = {loginController , signupController}