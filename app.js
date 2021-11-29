// * Importing
const express = require("express");
const { sequelize, User, Post } = require("./models");

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
   include: "posts",
  });

  return res.json(user);
 } catch (err) {
  console.log(err);

  return res.status(500).json({ error: "something went wrong" });
 }
});

// * delete the user
app.delete("/users/:uuid", async (req, res) => {
 const uuid = req.params.uuid;

 try {
  const user = await User.findOne({
   where: { uuid },
  });
  await user.destroy();

  return res.json({ message: "user deleted" });
 } catch (err) {
  console.log(err);

  return res.status(500).json({ error: "something went wrong" });
 }
});

// * edit user creds
app.put("/users/:uuid", async (req, res) => {
 const uuid = req.params.uuid;
 //  getting the new creds from the body
 const { name, email, role } = req.body;

 try {
  const user = await User.findOne({
   where: { uuid },
  });

  //   putting the updated user cred
  user.name = name;
  user.email = email;
  user.role = role;
  //   saving the cred
  await user.save();

  return res.json(user);
 } catch (err) {
  console.log(err);

  return res.status(500).json({ error: "something went wrong" });
 }
});

// * post posts
app.post("/posts", async (req, res) => {
 // request body
 const { userUuid, body } = req.body;

 try {
  //  selecting all the post
  const user = await User.findOne({ where: { uuid: userUuid } });
  const post = await Post.create({ body, userId: user.id });

  return res.json(post);
 } catch (err) {
  console.log(err);

  return res.status(500).json(err);
 }
});

// * get all the posts
app.get("/posts", async (req, res) => {
 try {
  const allPosts = await Post.findAll({
   include: "user",
  });

  return res.json(allPosts);
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
