import { Board, GameState } from "../../../shared/types";
type GameHook = () => {
    game: Board;
    makeMove: (position: number, tile: 'x' | 'o', rulesetId: string) => void;
    getDailyRuleset: () => Promise<string>;
    gameState: GameState;
    currentPlayer: 'x' | 'o';
};
declare const useGame: GameHook;
export default useGame;
