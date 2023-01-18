const express = require ('express')
const PostsClass = require('../controller/postController')
const protect = require('../middleware/authMiddleware')
const router = express.Router()

router.route('/api').get(protect,PostsClass.getAllPosts).post(protect,PostsClass.createPost)

router.route('/api/:id').get(protect,PostsClass.getOnePost).patch(protect,PostsClass.updatePost).delete(protect,PostsClass.deletePost)

module.exports = router 