const express = require("express")
const userController = require("../controllers/user.controller")
const userRoutes = express.Router();
const { verifyToken,verifyPassword,hashPassword } = require("../Auth/auth")



/****** PUBLIC **********/

// USING GET ( READ DATABASE)

userRoutes.get("/",userController.getUser)
userRoutes.get("/:id",userController.getUserById)

// USER LOGIN

userRoutes.post(
    "/login",
userController.getUserByEmailWithPasswordAndPassNext,
verifyPassword)

// USING POST ( CREATE IN DATABASE) 

userRoutes.post("/",hashPassword,userController.postUser)

/****** PROTECT **********/


// USING PUT ( UPDATE IN DATABASE )

userRoutes.put("/:id",hashPassword,verifyToken,userController.updateUser)

// USING DELETE ( DELETE IN DATABASE)

userRoutes.delete("/:id",hashPassword,verifyToken,userController.deleteUser)


module.exports = userRoutes