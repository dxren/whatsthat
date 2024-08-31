import { Router } from "express";
import { Board, GameState, Tile } from "../../shared/types";

export interface IGameService {
  postMove(
    game: Board,
    position: number,
    tile: Tile
  ): { game: Board; gameState: GameState; currentPlayer: "x" | "o" } | null;
  getDailyRule(): { rulesetId: string };
}

export const GameService: () => IGameService = () => ({
  postMove: (game, position, tile) => {
    //forge stuff
    const newGame: Board = ["o", "o", "x", "o", "x", "x", "o", "x", "x"];
    const currentPlayer = tile === "o" ? "x" : "o";
    return {
      game: newGame,
      gameState: GameState.InProgress,
      currentPlayer,
    };
  },
  getDailyRule: () => {
    return { rulesetId: `any-id` };
  },
});

//run the forge client

//return the current ruleset id
