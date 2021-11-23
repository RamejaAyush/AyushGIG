// * Importing
const express = require("express");
const { sequelize, User } = require("./models");

// ! PORT
const PORT = 5000;

// * invoking express
const app = express();

// json middleware
app.use(express.json());

//
app.post("/users", async (req, res) => {
 const { name, email, role } = req.body;

 try {
  const user = await User.create({
   name,
   email,
   role,
  });

  return res.json(user);
 } catch (err) {
  console.log(err);
  return res.status(500).json(err);
 }
});

app.listen(PORT, async () => {
 console.log(`server up on http://localhost:${PORT}`);
 await sequelize.sync({ force: true });
 console.log("Database synced");
});
