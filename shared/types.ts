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
const PlayerSchema = z.enum(['x', 'o']);
const BoardSchema = z.array(TileSchema).length(9);
const GameStateSchema = z.nativeEnum(GameState);

export const PostMoveBodySchema = z.object({
    game: BoardSchema,
    position: z.number().int().min(0).max(8),
    currentPlayer: PlayerSchema,
});
export const PostMoveResponseSchema = z.object({
    game: BoardSchema,
    gameState: GameStateSchema,
    currentPlayer: PlayerSchema,
});

export const GetDailyRulesetResponseSchema = z.object({
    rulesetId: z.string(),
});

export type PostMoveBody = z.infer<typeof PostMoveBodySchema>;
export type PostMoveResponse = z.infer<typeof PostMoveResponseSchema>;
export type GetDailyRulesetResponse = z.infer<typeof GetDailyRulesetResponseSchema>;