import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(7777, (e) => console.log(e ? e : "Server Started"));
