const userModels = require("../models/user.models")




// READ THE ALL USERS FROM DATABASE

const getUser = (req,res)=> {
    let sqlQuery = "SELECT * FROM users"
    const sqlConditions = []

    if(req.query.language != null){
        sqlQuery+= " WHERE language=?"
        sqlConditions.push(req.query.language)
    }
    if(req.query.city != null && req.query.language != null){
        sqlQuery+=" AND city=?"
        sqlConditions.push(req.query.city)
    }else if(req.query.city != null){
        sqlQuery+=" WHERE city=?"
        sqlConditions.push(req.query.city)
    }


    userModels.get(sqlQuery,sqlConditions)
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


// DELETE USER FROM DATA BASE USING DELETE

const deleteUser = (req,res)=> {
    const { id } = req.params
    userModels.deleteUser(id)
    .then((deleteUser)=>{
        if(deleteUser.affectedRows === 0){
            res.status(404).send("User not found")
        } else {
            res.sendStatus(204)
        }
    })
    .catch((error)=>{
        console.error(error)
        res.status(500).send("Error deleting the user")
    })
}

// PART OF VERIFY USER 

const getUserByEmailWithPasswordAndPassNext=(req,res,next)=>{
    const  {email}  = req.body;

    userModels.getEmailWithPassword(email)
    .then((users)=>{
        if(users[0] != null){
            req.user = users[0]
            next();
        } else {
            res.sendStatus(401)
        }
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send("Error retrieving data from database");
      })
}




module.exports = {
    getUser,
    getUserById,
    postUser,
    updateUser,
    deleteUser,
    getUserByEmailWithPasswordAndPassNext
}