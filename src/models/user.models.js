const database = require("../../database")

// READ ALL USERS FROM DATABASE

const get=()=>{
    return database.query("SELECT * FROM users")
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
    return database.query(`UPDATE users SET ? WHERE id=${id} `, body)
    .then(([updateUser])=> updateUser)
}





module.exports = {
    get,
    getUserById,
    create,
    update
}