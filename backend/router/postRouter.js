const express = require("express");
const router = express.Router();
const postController = require("../controller/postControler"); // adjust path if needed

// ---------------- Create Post ----------------
router.post("/create/post", postController.createPost);

// ---------------- Get All Posts ----------------
router.get("/read/post", postController.getAllPosts);

// ---------------- Get Single Post ----------------
router.get("/read/post/:postId", postController.getPostById);

// ---------------- Update Post ----------------
router.put("/update/post/:postId", postController.updatePost);

// ---------------- Delete Post ----------------
router.delete("/delete/post/:postId", postController.deletePost);

module.exports = router;
