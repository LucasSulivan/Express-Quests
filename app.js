const express = require("express");
require("dotenv").config();
const userHandlers = require("./userHandlers");

const app = express();

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome the list of Users");
};

app.get("/", welcome);



app.get("/api/users", userHandlers.getUser);
app.get("/api/users/:id", userHandlers.getUsersById);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
