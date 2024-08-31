import { Board, GameState } from "../../../shared/types";

interface MoveResult {
    board: Board;
    gameState: GameState;
    currentPlayer: 'x' | 'o';
};

interface IGameService {
    makeMove: (game: Board, position: number, tile: 'x' | 'o', rulesetId: string) => Promise<MoveResult | null>;
    getDailyRuleset: () => Promise<string>;
}

const GameService: () => IGameService = () => ({
    makeMove: async (game, position, tile, rulesetId) => {
        const url = endpoints.makeMove(rulesetId);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ game, position, tile }),
        });
        if (response.ok) {
            return response.json();
        }
        return null;
    },
    getDailyRuleset: async () => {
        const url = endpoints.getDailyRuleset;
        const response = await fetch(url);
        return response.json();
    }
});

export default GameService;