import { Board, Tile, GameState } from "../../shared/types";

type HandleMoveFn = (game: Board, position: number, tile: Tile, rulesetId: string) => Promise<{game: Board, gameState: GameState, currentPlayer: 'x' | 'o'}  | null>;
type RuleFn = (game: Board, position: number, tile: Tile) => Promise<{game: Board, gameState: GameState, currentPlayer: 'x' | 'o'}  | null>;
const handleMove: HandleMoveFn = async (game, position, tile, rulesetId) => {
    const rule = await import(`../rules/${rulesetId}.ts`);
    const result = await rule.default(game, position, tile);
    return result;
};

export default handleMove;