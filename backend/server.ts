import express from "express";
import cors from "cors";
import { GameService } from "./service/game";
const app = express();
const PORT = 4040;
import {validateRequestBody} from 'zod-express-middleware';
import { GetDailyRulesetResponse, PostMoveBodySchema } from "../shared/types";

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/daily", (req, res) => {
    const rulesetId = process.env.DAILY_RULE_ID;
    if (!rulesetId) {
        res.status(500).json({ error: "No daily ruleset id set" });
        return;
    }
    const result: GetDailyRulesetResponse = {
        rulesetId
    }
    res.json(result);
});

app.post("/:rulesetId", validateRequestBody(PostMoveBodySchema), async (req, res) => {
  const { game, position, currentPlayer } = req.body;
  const { rulesetId } = req.params;

  const gameService = GameService();
  const result = await gameService.postMove(game, position, currentPlayer, rulesetId);

  if (result) {
    res.json(result);
  } else {
    res.status(400).json({ error: "Invalid move" });
  }
});

app.listen(`${PORT}`, () => {
  console.log(`server is running on port ${PORT}, http://localhost:${PORT}`);
});
