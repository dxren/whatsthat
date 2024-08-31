import { Board, GetDailyRulesetResponseSchema, PostMoveBody, PostMoveResponse, PostMoveResponseSchema } from "../../../shared/types";
import { ENDPOINTS } from "./endpoints";

interface IGameService {
  makeMove: (
    game: Board,
    position: number,
    tile: "x" | "o",
    rulesetId: string
  ) => Promise<PostMoveResponse | null>;
  getDailyRuleset: () => Promise<string | null>;
}

const GameService: () => IGameService = () => ({
    makeMove: async (game, position, currentPlayer, rulesetId) => {
        const url = ENDPOINTS.POST_MOVE(rulesetId);
        const body: PostMoveBody = {
            game,
            position,
            currentPlayer,
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (response.ok) {
            const result = PostMoveResponseSchema.parse(await response.json());
            return result;
        }
        return null;
    },
    getDailyRuleset: async () => {
        const url = ENDPOINTS.GET_RULE;
        const response = await fetch(url);
        if (response.ok) {
            const result = GetDailyRulesetResponseSchema.parse(await response.json());
            return result.rulesetId;
        }
        return null;
    }
});

// const GameService: () => IGameService = () => ({
//     makeMove: async (game, position, tile, _rulesetId) => {
//         const board = [...game.slice(0, position), tile, ...game.slice(position + 1)];
//         const gameState = calculateGameState(board);
//         const currentPlayer = tile === 'x' ? 'o' : 'x';
//         return {
//             board,
//             gameState,
//             currentPlayer,
//         };
//     },
//     getDailyRuleset: async () => {
//         const url = ENDPOINTS.GET_RULE;
//         const response = await fetch(url);
//         return response.json();
//     },
// });

// const calculateGameState = (board: Board): GameState => {
//     const winningCombinations = [
//         [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
//         [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
//         [0, 4, 8], [2, 4, 6]             // Diagonals
//     ];

//     for (const [a, b, c] of winningCombinations) {
//         if (board[a] && board[a] === board[b] && board[a] === board[c]) {
//             return board[a] === 'x' ? GameState.XWin : GameState.OWin;
//         }
//     }

//     if (board.every(tile => tile !== null)) {
//         return GameState.Tie;
//     }

//     return GameState.InProgress;
// };

export default GameService;
