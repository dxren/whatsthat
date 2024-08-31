import { z } from "zod";

export type Board = Tile[];
export type Tile = 'x' | 'o' | null;
export enum GameState {
    XWin,
    OWin,
    Tie,
    InProgress,
};

const TileSchema = z.enum(['x', 'o']).nullable();
const BoardSchema = z.array(TileSchema).length(9);
const GameStateSchema = z.nativeEnum(GameState);

export const PostMoveBodySchema = z.object({
    game: BoardSchema,
    position: z.number().int().min(0).max(8),
    tileToPlace: TileSchema,
});
export const PostMoveResponseSchema = z.object({
    game: BoardSchema,
    gameState: GameStateSchema,
    currentPlayer: TileSchema,
});

export type PostMoveBody = z.infer<typeof PostMoveBodySchema>;
export type PostMoveResponse = z.infer<typeof PostMoveResponseSchema>;