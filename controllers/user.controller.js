//File for defining all controllers (handlers for api requests) pertaining to "user" model
const userModel = require('../models/user.model')
const jwt    = require('jsonwebtoken');
const dbConfig = require('../config/mongodb') //Get DB URL from configuration file

exports.login = (req,res)=>{
    console.log('Login', userModel)
    userModel.find({username: req.body.username, password: req.body.password}, (err, user)=> {
        if(user.length>=1){
            const payload = {
                user: user,
                check:  true
    
              };
    
              var token = jwt.sign(payload, dbConfig.secret, {
                    expiresIn: 1440 // expires in 24 hours
    
              });
    
              res.json({
                message: 'authentication done ',
                token: token,
                user:user
              });
        }else{
            res.status(500).send('No such user');
        }
      
    })
}

exports.signUp = (req,res,next)=>{
    let userObj = new userModel(
        {
            //name: req.body.name,
            username: req.body.username,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname
        }
    );
    userModel.find({username: req.body.username}, (err, user)=> {
        if(user.length==0){
            const payload = {
                user: JSON.stringify(user),
                check:  true
    
              };
              var token = jwt.sign(payload, dbConfig.secret, {
                    expiresIn: 1440 // expires in 24 hours
    
              });
              userObj.save( (err) => {
                if (err) {
                    return next(err);
                }
                res.json({
                    token: token,
                    user:userObj
                  });
            })
              
        }else{
            res.send('User already exists.')
        }
        
    })
    
}

exports.showProfile = (req,res)=>{
    console.log('Welcome')
}