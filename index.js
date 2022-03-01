const express = require("express");
const app = express();

const members = [{ id: 1, name: "Maria", age: 5, role: "Child" }];

app.use((req, res, next) => {
  console.log(`new ${req.method} request from ${req.hostname}`);
  next();
});
app.use(express.json());

app.get("/", (req, res) => {
  console.log("Hello");
  res.json({ msg: "Hi From Family" });
});

app.get("/members", (req, res) => {
  res.json(members);
});

app.get("/members/:id", (req, res) => {
  if (!req.params.id) res.status(400);
  const member = members.find(
    (member) => member.id === parseInt(req.params.id)
  );
  if (!member) res.status(404).end();
  res.json(member);
});
app.post("/members", (req, res) => {
  res.json(req.body);
  members.push(req.body);
});

app.delete("/members/:id", (req, res) => {
  if (!req.params.id) res.status(400).end();
  console.log(req.params.id)
  const memberIndex = members.findIndex(
    (member) => member.id === parseInt(req.params.id)
  );
  console.log(memberIndex)
  if (memberIndex == -1) res.status(404).end();
  members.splice(memberIndex ,1)
  console.log(members)
  res.status(204).end()
});
app.listen(3000, () => {
  console.log("Server listening on port 3000 🚀");
});
