import { useState } from "react";
import { Board, GameState } from "../../../shared/types";
import GameService from "../services/GameService";

const gameService = GameService();

type GameHook = () => {
    game: Board;
    makeMove: (position: number, tile: 'x' | 'o', rulesetId: string) => Promise<Board | null>;
    getDailyRuleset: () => Promise<string | null>;
    gameState: GameState;
    currentPlayer: 'x' | 'o';
};

const initialBoard: Board = [
    null, null, null, null, null, null, null, null, null,
];

const useGame: GameHook = () => {
    const [game, setGame] = useState<Board>(initialBoard);
    const [gameState, setGameState] = useState<GameState>(GameState.InProgress);
    const [currentPlayer, setCurrentPlayer] = useState<'x' | 'o'>('x');

    const makeMove = async (position: number, tile: 'x' | 'o', rulesetId: string) => {
        const result = await gameService.makeMove(game, position, tile, rulesetId);
        if (result) {
            console.log(result.game);
            setGame(result.game);
            setGameState(result.gameState);
            setCurrentPlayer(result.currentPlayer);
            return result.game;
        }
        return null;
    };

    const getDailyRuleset = async () => {
        const ruleset = await gameService.getDailyRuleset();
        return ruleset;
    };

    return ({
        game,
        makeMove,
        getDailyRuleset,
        gameState,
        currentPlayer,
    })
}

export default useGame;