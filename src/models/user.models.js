const database = require("../../database")

// READ ALL USERS FROM DATABASE

const get=(sqlQuery,sqlConditions)=>{
    return database.query(sqlQuery,sqlConditions)
    .then(([users])=>users)
}

// READ ONLY USER BY ID FROM DATABASE

const getUserById = (id)=>{
    return database.query(`SELECT * FROM users WHERE id=${id}`)
    .then(([getById])=> getById)
}

// CREATE NEW USER INTO DATABASE

const create =(body)=> {
    return database.query("INSERT INTO users SET ?", body)
    .then(([newUser])=>newUser)
}


// UPDATE USER FROM DATABASE

const update = (id,body)=> {
    return database.query(`UPDATE users SET ? WHERE id=? `, [body,id])
    .then(([updateUser])=> updateUser)
}

// DELETE USER FROM DATABASE

const deleteUser =(id)=> {
    return database.query(`DELETE FROM users WHERE id=${id}`)
    .then(([deleted])=> deleted)
}

//VALIDATION USER 

const getEmailWithPassword =(email)=>{

    return database.query("SELECT * FROM users WHERE email=?", [email] )
    .then(([result])=> result)
}




module.exports = {
    get,
    getUserById,
    create,
    update,
    deleteUser,
    getEmailWithPassword
}