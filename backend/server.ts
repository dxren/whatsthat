import express from "express";
import cors from "cors";
import { GameService } from "./service/game";
const app = express();
const PORT = 4040;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/daily", (req, res) => {
  res.json({ rulesetId: "any-id" });
});

app.post("/:rulesetId", (req, res) => {
  const { game, position, tile } = req.body;
  const { rulesetId } = req.params;

  const gameService = GameService();
  const result = gameService.postMove(game, position, tile);

  if (result) {
    res.json(result);
  } else {
    res.status(400).json({ error: "Invalid move" });
  }
});

app.listen(`${PORT}`, () => {
  console.log(`server is running on port ${PORT}, http://localhost:${PORT}`);
});
