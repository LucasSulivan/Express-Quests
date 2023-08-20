require("dotenv").config();
const express = require("express");
const port = process.env.APP_PORT ?? 5000;
const server = express();
const userRoutes = require("./src/routes/user.routes")


server.use(express.json());
server.use("/api/users", userRoutes)
server.use("/api/users/:id",userRoutes);







server.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
