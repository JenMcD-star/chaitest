const express = require("express");
const app = express();
app.use(express.static(__dirname + "/public"));
app.use(express.json());

const people = [];

app.post("/api/v1/people", (req, res) => {
  if (!req.body.name) {
    res.status(400).json({ error: "Please enter a name." });
    return;
  }
  if (!req.body.age) {
    res.status(400).json({ error: "An age is required." });
    return;
  }
  const age = Number(req.body.age);
  if (age < 0) {
    res.status(400).json({ error: "Must be a valid age." });
    return;
  }
  req.body.age = age;
  req.body.index = people.length;
  people.push(req.body);

  res.status(201).json(`A person record was added. ${req.body.name}, age: ${req.body.age} index number ${req.body.index} added.`);
});

app.get("/api/v1/people", (req, res) => {
  res.json(people);
});


app.get("/api/v1/people/:id", (req, res) => {
  const index = Number(req.params.id);
  if (index < 0 || index >= people.length) {
    res.status(400).json({ error: `No person found the index number ${index}` })
    return;
  }
  res.json(people[index]);
})
//app.all("/api/v1/*", (req, res) => {
// res.json({ error: "That route is not implemented." });
//});

const server = app.listen(3000, () => {
  console.log("listening on port 3000...");
});


module.exports = { app, server }

/*
, retrieving the list of
people entries, and retrieving a single person entry. People entries are stored in
the people array, which starts out empty. They are not persisted. There is no
file i/o or database access in this exercise.
*/