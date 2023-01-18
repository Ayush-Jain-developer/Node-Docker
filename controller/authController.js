const User = require ('../models/userModel')
const bcrypt =  require ('bcrypt')



module.exports = class UserAuth {
  static signUp = async (req,res,next) =>{
    const {username, password} = req.body
    
    try {
      const hashPassword = await bcrypt.hash(password, 12)
      const user  = await User.create({
        username: username,
        password :  hashPassword
      })
      req.session.user = user
      res.status(201).json({
        status : "success",
        data : {
          user : user
        }
      })
    }catch(e){
      
      return res.status(400).json({
        status : "failed",
        message : e.message
      })
    }
  }

  static login = async (req,res,next)=>{
    
    const {username, password} = req.body
    
    try {
      const user = await User.findOne({username})
      
      if(!user){
        return res.status(404).send({
          status : "Failed",
          message: "User not found."
        })
      }else {
       
        const isCorrect = await bcrypt.compare(password, user.password)
       if(isCorrect){
        
        req.session.user = user;
        
        console.log(req.session);
        return res.status(200).send({
          status : 200,
          message : "Logged in successfully",
          
        })
        
       }else {
        return res.status(400).send({
          status : 400,
          message : "Incorrect username or password."
        })
       }
      }
    }catch(e){
      console.log(e.message);
      return res.status(400).send({
        status : 400,
        message : e.message
      })
    }
  }
}

