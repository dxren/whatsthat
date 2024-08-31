import { useState } from "react";
import { Board, GameState } from "../../../shared/types";
import GameService from "../services/gameService";

const gameService = GameService();

type GameHook = () => {
    game: Board;
    makeMove: (position: number, tile: 'x' | 'o', rulesetId: string) => void;
    getDailyRuleset: () => Promise<string>;
    gameState: GameState;
};

const initialBoard: Board = [
    null, null, null, null, null, null, null, null, null,
];

const useGame: GameHook = () => {
    const [game, setGame] = useState<Board>(initialBoard);
    const [gameState, setGameState] = useState<GameState>(GameState.InProgress);

    const makeMove = async (position: number, tile: 'x' | 'o', rulesetId: string) => {
        const {board: newBoard, gameState} = await gameService.makeMove(game, position, tile, rulesetId);
        setGame(newBoard);
        setGameState(gameState);
    };

    const getDailyRuleset = async () => {
        const ruleset: string = await gameService.getDailyRuleset();
        return ruleset;
    };

    return ({
        game,
        makeMove,
        getDailyRuleset,
        gameState,
    });
}

export default useGame;