const fs = require("fs");
const slugify = require("slugify");
const express = require("express");

const app = express();

const data = fs.readFileSync("data.json", "utf-8");
const dataObj = JSON.parse(data);

const slugs = dataObj.map((el) => {
  return slugify(el.title, { lower: true });
});
app.get("/", function (req, res) {
  res.send(`<h1>Home Page</h1>`);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

console.log(slugs);
