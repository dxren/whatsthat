export type Board = Tile[];
export type Tile = 'x' | 'o' | null;
export declare enum GameState {
    XWin = 0,
    OWin = 1,
    Tie = 2,
    InProgress = 3
}
