const express = require('express');
const app = express();
const port = 8080;
const bcrypt = require("bcrypt");
const knex = require('knex')(require('../knexfile.js')['development']);

app.listen(port, () => {
  console.log(`Application listening on Port ${port}!`)
});

//display something at root route to show backend is working
app.get("/", (req, res) => {
  res.send("Hello, and welcome to my shop!");
})

//fetch crystals sorted by type
app.get("/crystal/:type", (req, res) => {
  const { type } = req.params;

  knex.select()
    .from('Item')
    .where('Description', '=', type)
    .then((crystals) => {
      res.cookie('Guest', true, {httpOnly: true, sameSite: true})
      res.status(200).json(crystals);
    })
});

//fetch all crystals
app.get("/crystal", (req, res) => {
  knex.select().from('Item')
    .then((crystals) => {
      res.status(200).json(crystals);
    })
});

//make a correction to a crystal in inventory
app.put("/crystal/:id", (req, res) => {
  const { id } = req.params;
  const { Name, Description, Quantity } = req.body;

  knex('Item')
    .where('id', id)
    .update({ Name, Description, Quantity })
    .then(() => {
      res.status(200).json({ message: "Crystal information updated successfully" });
    })
});

//delete an item from inventory
app.delete("/crystal/:id", (req, res) => {
  const { id } = req.params;

  knex('Item')
    .where('id', id)
    .del()
    .then(() => {
      res.status(200).json({ message: "Crystal deleted successfully" });
    })
});


//create new admin
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
});

//user logs in
app.get("/user", (req, res) => {
  const { Username, Password } = req.body;

  knex.select()
  .from('User')
  .where(Username: req.body.Username)
  .then((users) => {
    if (users.length != 0) {
      const user = users[0];

      bcrypt.compare(Password, user.Password, (result) => {
        if (result) {
          res.cookie('Admin', true, { httpOnly: true, sameSite: true });
          res.status(200).json({ message: "Authentication successful" });
        } else {
          res.status(401).json({ error: "Authentication failed" });
        };
      });
    } else {
      res.status(404).json({ message: "User not found" });
    };
  })
});