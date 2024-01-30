const express = require('express');
const app = express();
const port = 8080;
const bcrypt = require("bcrypt");
const knex = require('knex')(require('../knexfile.js')['development']);
//const hash = bcrypt.hash("", 13);

app.listen(port, () => {
  console.log(`Application listening on Port ${port}!`)
});

//display something at root route to show backend is working
app.get("/", (req, res) => {
  res.send("Hello, and welcome to my shop!");
})
//implement after fixing logging in
// app.get("/crystal/:type", (req, res) => {

// })

//new user - create
app.post("/user", (req, res) => {
  const passHash = bcrypt.hashSync(req.body.Password, 13);
  const { First_name, Last_name, Username } = req.body;

  knex('User')
  .insert({ First_name, Last_name, Username, passHash})
  .then(res.status(201).json({ message: "Your information has been saved!"}))
  .catch(error => {
    res.status(500).json({ error: "There was an issue adding your information. Please try again."})
    console.log(error);
  })
})

//user logs in
app.get("/user", (req, res) => {
  const { Username, Password } = req.body;

  knex.select()
  .from('User')
  .where(Username: req.body.Username)
  .then()
})