const express = require("express")
const userController = require("../controllers/user.controller")
const userRoutes = express.Router();

// USING GET ( READ DATABASE)

userRoutes.get("/",userController.getUser)
userRoutes.get("/:id",userController.getUserById)

// USING POST ( CREATE IN DATABASE) 

userRoutes.post("/",userController.postUser)

// USING PUT ( UPDATE IN DATABASE )

userRoutes.put("/:id",userController.updateUser)

// USING DELETE ( DELETE IN DATABASE)

userRoutes.delete("/:id",userController.deleteUser)


module.exports = userRoutes