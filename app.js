// * Importing
const express = require("express");
const { sequelize, User, post } = require("./models");

// ! PORT
const PORT = 5000;

// * invoking express
const app = express();

// json middleware
app.use(express.json());

// * creating all users
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

// * end poit to get all users
app.get("/users", async (req, res) => {
 try {
  const users = await User.findAll();
  return res.json(users);
 } catch (err) {
  console.log(err);
  return res.status(500).json({ error: "something went wrong" });
 }
});

// * Find a user with a specfic uuid
app.get("/users/:uuid", async (req, res) => {
 const uuid = req.params.uuid;
 try {
  const user = await User.findOne({
   where: { uuid },
  });
  return res.json(user);
 } catch (err) {
  console.log(err);
  return res.status(500).json({ error: "something went wrong" });
 }
});

app.post("/posts", async (req, res) => {
 const { userUuid, body } = req.body;

 try {
  const user = await User.findOne({ where: { uuid: userUuid } });

  const post = await Post.create({ body, userId: user.id });

  return res.json(post);
 } catch (err) {
  console.log(err);
  return res.status(500).json(err);
 }
});

// ! listening on the port
app.listen(PORT, async () => {
 console.log(`server up on http://localhost:${PORT}`);
 await sequelize.authenticate();
 console.log("Database synced");
});
