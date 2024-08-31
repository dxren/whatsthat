import { Board, GameState } from "../../../shared/types";
interface MoveResult {
    board: Board;
    gameState: GameState;
    currentPlayer: 'x' | 'o';
}
interface IGameService {
    makeMove: (game: Board, position: number, tile: 'x' | 'o', rulesetId: string) => Promise<MoveResult | null>;
    getDailyRuleset: () => Promise<string>;
}
declare const GameService: () => IGameService;
export default GameService;
