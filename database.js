require('dotenv').config();
const mysql = require("mysql2/promise");


const database = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

database
.query("SELECT * FROM users")
.then(([users])=>{
    console.log([users])
})
.catch((err)=>{
    console.log(err)
})


database.getConnection()
.then(()=>{
    console.log("Can reach database")
})
.catch((err)=>{
    console.log(err)
});

module.exports = database