const protect = async(req,res,next)=>{
  const {user} = req.session
  if(!user){
    
    return res.status(400).json({
      status: "failed",
      message : 'Unauthorised'
    })
  }else {
   
    req.user = user
    
    next()
  }
}

module.exports = protect