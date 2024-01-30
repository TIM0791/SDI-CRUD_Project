const express = require('express');
const app = express();
const port = 8080;
const bcrypt = require("bcrypt");
const knex = require('knex')(require('../knexfile.js')['development']);

app.use(express.json());

app.listen(port, () => {
  console.log(`Application listening on Port ${port}!`)
});

//display something at root route to show backend is working
app.get("/", (req, res) => {
  res.send("Hello, and welcome to my shop!");
});

//fetch crystals sorted by type of crystal per description
app.get("/crystal/:type", (req, res) => {
  const { type } = req.params;
  console.log( `Type: ${type}`)

  knex.select()
    .from('Item')
    .where('Description', '=', `${type}`)
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
  const { UserID, Name, Description, Quantity, Image } = req.body;

  knex('Item')
    .where({ id })
    .update({ UserID, Name, Description, Quantity, Image})
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

app.post("/crystal", (req, res) => {
  const { UserID, Name, Description, Quantity, Image } = req.body;

  knex('Item')
  .insert({ UserID, Name, Description, Quantity, Image })
  .then(res.status(201).json({ message: "Item logged into Inventory, successfully!"}))
});

//create new admin
// app.post("/user", (req, res) => {
//   const passHash = bcrypt.hashSync(req.body.Password, 13);
//   const { First_name, Last_name, Username } = req.body;

//   knex('User')
//   .insert({ First_name, Last_name, Username, passHash})
//   .then(res.status(201).json({ message: "Your information has been saved!"}))
//   .catch(error => {
//     res.status(500).json({ error: "There was an issue adding your information. Please try again."})
//     console.log(error);
//   })
// });

// admin logs in
app.post("/user", (req, res) => {
  const { Username, Password } = req.body;

  knex.select()
    .from("Admin")
    .where("Username", Username)
    .first()
    .then((user) => {
      if (user) {
        bcrypt.compare(Password, user.Password, (err, result) => {
          if (result) {
            res.cookie('Admin', user.id, { httpOnly: true, sameSite: true });
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
