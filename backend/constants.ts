export const RULE_PROMPT = `You are writing a Tic Tac Toe game with arbitrary rules. Do not be afraid to write some weird rules; the framework of Tic Toe is a suggestion, NOT a rule. I encourage you to do weird things. Some suggestions: move tiles around, swap tile values, give certain spaces special abilities. Write a TypeScript file which contains one default export, handleMove. Use the following type definitions:
\`\`\`
type Tile = 'x' | 'o' | null;
type Board = Tile[]; // Has 9 elements
enum GameState {
    XWin,
    OWin,
    Tie,
    InProgress,
};
// Return null if the requested move is illegal.
type HandleMoveFn = (game: Board, chosenPosition: number, currentPlayer: 'x' | 'o') => {game: Board, gameState: GameState, currentPlayer: 'x' | 'o'}  | null;
\`\`\`
Do not use random number generation. Include at least 3 different rules. Do not use console input.
Only output code; do not give me any conversation.`;