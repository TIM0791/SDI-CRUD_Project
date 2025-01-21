const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const port = 8080;
const bcrypt = require("bcrypt");
const knex = require('knex')(require('../knexfile.js')['development']);

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

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

  knex.select()
    .from('Item')
    .where('Description', '=', `${type}`)
    .then((crystals) => {
      res.cookie('Guest', true, {httpOnly: true, sameSite: true})
      res.status(200).json(crystals);
    })
});

//fetch crystals added by one person
// app.get("/crystal/:AdminID", (req, res) => {
//   const { AdminID } = req.params;
//   console.log(AdminID);
//   knex.select()
//     .from('Item')
//     .where({ AdminID })
//     .then((crystals) => {
//       res.status(200).json(crystals);
//     })
//     .catch((error) => {
//       console.error(error);
//       res.status(500).json({ error: "Internal Server Error" });
//     });
// });

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
  const { AdminID, Name, Description, Quantity, Image } = req.body;

  knex('Item')
    .where({ id })
    .update({ AdminID, Name, Description, Quantity, Image})
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

//add new inventory item
app.post("/crystal", (req, res) => {
  const { AdminID, Name, Description, Quantity, Image } = req.body;

  knex('Item')
  .insert({ AdminID, Name, Description, Quantity, Image })
  .then(res.status(201).json({ message: "Item logged into Inventory, successfully!"}))
});


// admin logs in and gets cookie
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
            res.cookie('Admin', user.id, { sameSite: true });
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

//admin create new user
app.post("/register", (req, res) => {
  const { First_Name, Last_Name, Username, Password } = req.body;

  const adminHash = bcrypt.hashSync(Password, 13);

  knex("Admin")
  .insert({ First_Name, Last_Name, Username, Password: adminHash })
  .then(() => {res.status(201).json({ message: "Teammate successfully added!"})})
});

//fetch all admins
app.get("/user", (req, res) => {
  knex.select().from('Admin')
    .then((ppl) => {
      res.status(200).json(ppl);
    })
});