const fs = require("fs");
// to generate unique id for every user
const { v4 } = require("uuid");

let data = require("../data.json");
const jsonFilePath = "./data.json";
const { log } = require("console");

// Get All Users Info
const getAllUsers = (req, res) => {
  res.json("200", data);
};

// Add New User
const addUser = (req, res) => {
  const user = req.body;
  data.push({ ...user, id: v4() });
  updateDataFile();
  console.log("user added");
  res.send(`User "${user.name}" has been added successfully.`);
};

// Get Single user by Id
const getUserById = (req, res) => {
  const { id } = req.params;
  const user = data.find((user) => user.id === id);
  user ? res.send(user) : res.send("404", `User with "${id}" not found `);
};

// Delete User
const deleteUser = (req, res) => {
  const { id } = req.params;
  const user = data.find((user) => user.id === id);
  user
    ? (data = data.filter((user) => user.id !== id))
    : res.send("404", `User With ID "${id}" not found`);

  updateDataFile();
  console.log(data);
  res.send(`User Deleted successfully!`);
};

// Update User Info
const updateUserInfo = (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;
  const user = data.find((user) => user.id === id);
  if (user) {
    if (username) user.username = username;
    if (email) user.email = email;
  } else {
    res.send("404", "User Not Found");
  }
  updateDataFile();
  res.send(`User has been updated successfully`);
};

// Update data in "data.json" file
const updateDataFile = () => {
  fs.writeFileSync(jsonFilePath, JSON.stringify(data), "utf-8");
};

module.exports = {
  getAllUsers,
  addUser,
  getUserById,
  deleteUser,
  updateUserInfo,
};
