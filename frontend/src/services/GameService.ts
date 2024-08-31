import { Board } from "../../../shared/types";

interface IGameService {
    makeMove: (game: Board, position: number, tile: 'x' | 'o', rulesetId: string) => Promise<Board>;
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
        return response.json();
    },
    getDailyRuleset: async () => {
        return '';
    }
});

export default GameService;