
const express = require("express");
const app = express();

app.use(express.json());

let users = [
  { id: 1, name: "Rahul", age: 21 },
  { id: 2, name: "Priya", age: 22 }
];


app.get("/users", (req, res) => {
  res.status(200).json(users);
});

app.post("/users", (req, res) => {
  const { name, age } = req.body;

  if (!name || age === undefined) {
    return res.status(400).json({
      message: "Name and age are required"
    });
  }

  const user = {
    id: users.length
      ? Math.max(...users.map(u => u.id)) + 1
      : 1,
    name,
    age
  };

  users.push(user);
  res.status(201).json(user);
});

app.put("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  const { name, age } = req.body;

  if (!name || age === undefined) {
    return res.status(400).json({
      message: "Name and age are required"
    });
  }

  users[index] = { id, name, age };
  res.status(200).json(users[index]);
});

app.delete("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  users.splice(index, 1);
  res.status(200).json({
    message: "User deleted successfully"
  });
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
