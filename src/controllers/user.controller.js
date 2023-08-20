const userModels = require("../models/user.models")



// READ THE ALL USERS FROM DATABASE

const getUser = (req,res)=> {
    userModels.get()
    .then((users)=>{
        if(users !== null && users.length > 0){
            res.status(200).send(users)
        } else {
            res.status(404).send("User not found")
        }
    })
    .catch((error)=>{
        console.error(error)
        res.status(500).send("Error retrieving from database")
    })
}


// READ ONLY USER BY ID FROM DATABASE

const getUserById = (req,res)=> {
    const { id } = req.params
    userModels.getUserById(id)
    .then((users)=>{
        if(users !== null && users.length > 0){
            res.status(200).send(users)
        } else {
            res.status(404).send("User not found")
        }
    })
    .catch((error)=>{
        console.error(error)
        res.status(500).send("Error retrieving from database")
    })
}


// CREATE NEW USER USING POST

const postUser = (req,res)=>{
    const body = req.body
    userModels.create(body)
    .then((newUser)=>{
        if(newUser.affectedRows > 0){
            res.status(201).send(`New User has created with id ${newUser.insertId}`)
        } else {
            res.status(403).send("Your request is forbidden")
        }
    })
    .catch((error)=>{
        console.error(error)
        res.status(500).send("Has problem from database")
    })
}

// UPDATE USER FROM DATABASE USING PUT

const updateUser = (req,res)=>{
    const { id } = req.params
    const body = req.body

    userModels.update(id,body)
        .then((updateUser)=>{
        if(updateUser.affectedRows > 0){
            res.status(204).send("The user was updated")
        } else {
            res.status(404).send("User not found")
        }
    })
    .catch((error)=>{
        console.error(error)
        res.status(500).send("Have a problem in database")
    })
}



module.exports = {
    welcome,
    getUser,
    getUserById,
    postUser,
    updateUser
}