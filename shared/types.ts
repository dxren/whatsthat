export type Board = Tile[];
export type Tile = 'x' | 'o' | null;
export enum GameState {
    XWin,
    OWin,
    Tie,
    InProgress,
};