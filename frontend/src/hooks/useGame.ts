import { useState, useEffect, useCallback } from 'react';

type GameStateType = 'None' | 'XWin' | 'OWin' | 'Tie';
type Player = 'x' | 'o';
type GameBoard = (Player | null)[];

// Enum for game states
const GameState: { [key: string]: GameStateType } = {
  None: 'None',
  XWin: 'XWin',
  OWin: 'OWin',
  Tie: 'Tie',
};

const useGame = () => {
  const [game, setGame] = useState<GameBoard>(Array(9).fill(null));
  const [gameState, setGameState] = useState<GameStateType>(GameState.None);
  const [rulesetId, setRulesetId] = useState<string | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<Player>('x');

  const checkGameState = useCallback((): GameStateType => {
    const winningPatterns = getWinningPatterns(rulesetId);
    for (let pattern of winningPatterns) {
      const [a, b, c] = pattern;
      if (game[a] && game[a] === game[b] && game[a] === game[c]) {
        return game[a] === 'x' ? GameState.XWin : GameState.OWin;
      }
    }

    return game.includes(null) ? GameState.None : GameState.Tie;
  }, [game, rulesetId]);

  const makeMove = (position: number) => {
    if (gameState !== GameState.None) {
      console.error('The game has already ended.');
      alert('The game has already ended.');
      return;
    }

    if (game[position] !== null) {
      console.error('Invalid move: The position is already taken.');
      alert('Invalid move: The position is already taken.');
      return;
    }

    const newGame = [...game];
    newGame[position] = currentPlayer;
    setGame(newGame);

    const newGameState = checkGameState();
    setGameState(newGameState);

    setCurrentPlayer(currentPlayer === 'x' ? 'o' : 'x');
  };

  const getDailyRuleset = useCallback(() => {
    const dailyRulesetId = '' // Implement this function
    setRulesetId(dailyRulesetId);
  }, []);

  useEffect(() => {
    if (rulesetId) {
      setGame(Array(9).fill(null));
      setGameState(GameState.None);
    }
  }, [rulesetId]);

  const getWinningPatterns = (rulesetId: string | null) => {
    const rulesets: { [key: string]: number[][] } = {
      default: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ],
    };

    return rulesets[rulesetId || 'default'] || rulesets['default'];
  };

  return {
    game,
    gameState,
    makeMove,
    getDailyRuleset,
    currentPlayer,
  };
};

export default useGame;
