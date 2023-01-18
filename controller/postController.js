const Post = require('../models/postModel')

module.exports = class PostsClass {
  static getAllPosts = async (req, res, next) => {
    try {
      const posts = await Post.find()
      console.log(posts);
      res.status(200).send({
        status: 'success',
        results: posts.length,
        data: posts,
      })
    } catch (e) {
      res.status(400).send({
        status: 'Failed',
      })
    }
  }

  static getOnePost = async (req, res, next) => {
    try {
      const post = await Post.findById(req.params.id)
      res.status(200).send({
        status: 200,

        data: post,
      })
    } catch (e) {
      res.status(400).send({
        status: 'Failed',
      })
    }
  }

  static createPost = async (req,res,next)=>{
    try {
      
      const post = await Post.create(req.body)
      res.status(200).json("Post created.")
    }catch(e){
      
      return res.status(400).send({
        status : "Failed",
        message : e.message
      })
    }
  }

  static updatePost = async (req,res,next)=>{
    try {
      const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      })
      res.status(200).send("Post updated.")
    }catch(e){
      res.status(400).send({
        status : "Failed"
      })
    }
  }

  static deletePost =  async (req,res,next)=>{
    try {
      const post = await Post.findOneAndDelete(req.params.id)
      res.status(200).send("Post deleted.")
    }catch(e){
      res.status(400).send({
        status : "Failed"
      })
    }
  }

}
