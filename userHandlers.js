const database = require("./database");

const getUser = (req, res) => {
  database
  .query("SELECT * FROM users")
  .then(([users])=>{
    res.json(users)
  })
  .catch((err)=>{
    console.log(err);
    res.status(500).send("Error retrieving data from database")
  })
};

const getUsersById = (req, res) => {
  const id = Number(req.params.id);

  database
  .query(`SELECT * FROM users WHERE id=?`,[id])
  .then(([users])=>{
    if(users[0] != null){
      res.json(users[0])
    }else{
      res.status(404).send("Not Found")
    }
  })
  .catch((err)=>{
    console.log(err)
    res.status(500).send("Error retrieving data from database")
  })

};

module.exports = {
  getUser,
  getUsersById,
};
