import { Router } from "express";
import { Board, GameState, PostMoveResponse, Tile } from "../../shared/types";
import handleMove from "../utils/handleMove";

export interface IGameService {
  postMove(
    game: Board,
    position: number,
    tile: Tile,
    rulesetId: string
  ): Promise<PostMoveResponse | null>;
  getDailyRule(): { rulesetId: string };
}

export const GameService: () => IGameService = () => ({
  postMove: async (game, position, tile, rulesetId) => {
    const result = await handleMove(game, position, tile, rulesetId);
    return result;
  },
  getDailyRule: () => {
    return { rulesetId: `any-id` };
  },
});

//run the forge client

//return the current ruleset id
