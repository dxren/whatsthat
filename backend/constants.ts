export const RULE_PROMPT = `You are writing a game with arbitrary rules. Players take turns placing tokens on a 3x3 grid. Make sure the rules are weird and unexpected. Some suggestions: move tiles around, swap tile values, give certain spaces triggers when selected, write weird win conditions, etc. Write a TypeScript file which contains one default export, handleMove. Use the following type definitions:
\`\`\`
type Tile = 'x' | 'o' | null;
type Board = Tile[]; // Has 9 elements
type HandleMoveFn = (game: Board, chosenPosition: number, currentPlayer: 'x' | 'o') => {game: Board, gameState: GameState, currentPlayer: 'x' | 'o'};
enum GameState {
    XWin,
    OWin,
    Tie,
    InProgress,
};
\`\`\`
Do not use random number generation. Include at least 5 different rules. Do not use console input. This is NOT Tic Tac Toe, do NOT use Tic Tac Toe rules. Do not throw errors; try to handle all possible moves and edge cases. Even if a space is occupied, try to figure out something to do. Do not give players extra turns; always take turns.
Only output code; do not give me any conversation.`;