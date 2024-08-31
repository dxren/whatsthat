import express from "express";

const app = express();
const PORT = 4040;

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(`${PORT}`, () => {
  console.log(`server is running on port ${PORT}, http://localhost:${PORT}`);
});
