import { useState } from "react";
import { Board, GameState } from "../../../shared/types";
import GameService from "../services/GameService";

const gameService = GameService();

type GameHook = () => {
    game: Board;
    makeMove: (position: number, tile: 'x' | 'o', rulesetId: string) => void;
    getDailyRuleset: () => Promise<string>;
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
            setGame(result.board);
            setGameState(result.gameState);
            setCurrentPlayer(result.currentPlayer);
        }
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
        currentPlayer,
    })
}

export default useGame;