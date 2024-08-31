import { useState } from "react";
import { Board, GameState } from "../../../shared/types";
import GameService from "../services/GameService";

const gameService = GameService();

type History = {
    game: Board;
    selectedPosition: number;
    gameState: GameState;
}[];

type GameHook = () => {
    game: Board;
    makeMove: (position: number, tile: 'x' | 'o', rulesetId: string) => Promise<Board | null>;
    getDailyRuleset: () => Promise<string | null>;
    gameState: GameState;
    currentPlayer: 'x' | 'o';
    history: History;
    resetGame: () => void;
};

const initialBoard: Board = [
    null, null, null, null, null, null, null, null, null,
];

const useGame: GameHook = () => {
    const [game, setGame] = useState<Board>(initialBoard);
    const [gameState, setGameState] = useState<GameState>(GameState.InProgress);
    const [currentPlayer, setCurrentPlayer] = useState<'x' | 'o'>('x');
    const [history, setHistory] = useState<History>([{ game: initialBoard, selectedPosition: -1, gameState: GameState.InProgress }]);

    const resetGame = () => {
        setGame(initialBoard);
        setGameState(GameState.InProgress);
        setCurrentPlayer('x');
        setHistory([{ game: initialBoard, selectedPosition: -1, gameState: GameState.InProgress }, ...history]);
    };
    
    const makeMove = async (position: number, tile: 'x' | 'o', rulesetId: string) => {
        const result = await gameService.makeMove(game, position, tile, rulesetId);
        if (result) {
            console.log(history);
            setGame(result.game);
            setGameState(result.gameState);
            setCurrentPlayer(result.currentPlayer);
            setHistory([{ game: result.game, selectedPosition: position, gameState: result.gameState }, ...history]);
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
        history,
        resetGame
    })
}

export default useGame;