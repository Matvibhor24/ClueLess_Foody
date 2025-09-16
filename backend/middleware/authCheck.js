const jwt = require("jsonwebtoken");
const User = require("../models/UserModel")

const authCheck = async (req, res, next) => { 
    const {authorization} = req.headers;

    if(!authorization){
        res.status(401).json({error : "Authorization token not required"})
    }

    const token = authorization.split(" ")[1];

    try{
        const _id = await jwt.verify(token, process.env.SECRET_STRING);

        req.user = User.findOne({_id}).select('_id');
        next();
    }
    catch(err){
        console.log(err);
        res.status(401).json({error : "Request is not authorized"})
    }

}

module.exports = authCheck;