import { Board, GameState } from "../../../shared/types";
import { ENDPOINTS } from "./endpoints";

interface MoveResult {
  board: Board;
  gameState: GameState;
  currentPlayer: "x" | "o";
}

interface IGameService {
  makeMove: (
    game: Board,
    position: number,
    tile: "x" | "o",
    rulesetId: string
  ) => Promise<MoveResult | null>;
  getDailyRuleset: () => Promise<string>;
}

// const GameService: () => IGameService = () => ({
//     makeMove: async (game, position, tile, rulesetId) => {
//         const url = endpoints.makeMove(rulesetId);
//         const response = await fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ game, position, tile }),
//         });
//         if (response.ok) {
//             return response.json();
//         }
//         return null;
//     },
//     getDailyRuleset: async () => {
//         const url = endpoints.getDailyRuleset;
//         const response = await fetch(url);
//         return response.json();
//     }
// });

const GameService: () => IGameService = () => ({
    makeMove: async (game, position, tile, _rulesetId) => {
        const board = [...game.slice(0, position), tile, ...game.slice(position + 1)];
        const gameState = calculateGameState(board);
        const currentPlayer = tile === 'x' ? 'o' : 'x';
        return {
            board,
            gameState,
            currentPlayer,
        };
    },
    getDailyRuleset: async () => {
        const url = ENDPOINTS.GET_RULE;
        const response = await fetch(url);
        return response.json();
    },
});

const calculateGameState = (board: Board): GameState => {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const [a, b, c] of winningCombinations) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a] === 'x' ? GameState.XWin : GameState.OWin;
        }
    }

    if (board.every(tile => tile !== null)) {
        return GameState.Tie;
    }

    return GameState.InProgress;
};

export default GameService;
