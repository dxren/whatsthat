import React, { useEffect, useState } from "react";
import useGame from "./hooks/useGame";
import "./App.css";
import { GameState } from "../../shared/types";

const App: React.FC = () => {
  const { game, makeMove, getDailyRuleset, currentPlayer, history, resetGame, gameState } = useGame();
  const [rulesetId, setRulesetId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const rulesetId = await getDailyRuleset();
      setRulesetId(rulesetId);
    })();
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#191919] p-4 md:p-8">
      {/* Game Board and Player Selection */}
      <div className="flex flex-col items-center justify-center w-full md:w-2/3 mb-8 md:mb-0">
        <h1 className="text-[#F3E0EF] text-3xl md:text-4xl font-bold mb-4 md:mb-6">
          Tic Tac Woah
        </h1>
        <div
          className="grid grid-cols-3 grid-rows-3 gap-1 md:gap-2 bg-[#191919] bg-opacity-20"
          style={{ width: "100%", maxWidth: "500px", aspectRatio: "1 / 1" }}
        >
          {game.map((value: "x" | "o" | null, index: number) => (
            <div
              key={index}

              onClick={() => { if (rulesetId && gameState === GameState.InProgress) makeMove(index, currentPlayer, rulesetId) }}
              style={{
                background: "linear-gradient(to right, #F63331 15%, #594368 55% ) fixed",
              }}
              className="flex items-center justify-center w-full h-full border border-white text-2xl md:text-4xl font-bold text-[#F3E0EF] cursor-pointer rounded-md bg-fixed"
            >

              {value?.toUpperCase()}
            </div>
          ))}
        </div>

        <div className="flex mt-4 md:mt-6 space-x-4">
          <span className="text-[#FBC61F] text-xl md:text-2xl font-bold">
            {gameState === GameState.InProgress
              ? `${currentPlayer.toUpperCase()}'s Turn`
              : gameState === GameState.XWin
              ? "X Wins!"
              : gameState === GameState.OWin
              ? "O Wins!"
              : "It's a Tie!"}
          </span>
        </div>
      <button onClick={resetGame} className="mt-4 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded">Reset Game</button>
      </div>

      {/* Right Side: History Section */}
      <div className="flex flex-col flex-1 p-4">
        <h1 className="text-white text-2xl mb-4 text-left">History</h1>
        <div
          className="grid grid-cols-3 gap-x-2.5 gap-y-4 overflow-y-auto"
          style={{ maxHeight: "80vh" }}
        >
          {history.map((historyItem, historyIndex) => (
            <div
              key={historyIndex}
              className="w-24 h-24 bg-gray-300 bg-opacity-20 border border-white flex items-center justify-center"
            >
              <div className="grid grid-cols-3 grid-rows-3 gap-0.5 w-full h-full">
                {historyItem.game.map((value: any, index: any) => (
                  <div
                    key={index}
                    className={`flex items-center justify-center w-full h-full bg-gray-300 border border-white text-xl font-bold ${
                      historyItem.selectedPosition === index ? 'text-red-400' : 
                      (historyItem.gameState === GameState.XWin && value === 'x') || (historyItem.gameState === GameState.OWin && value === 'o') ? 'text-green-500' : 'text-white'
                    }`}
                  >
                    {value?.toUpperCase()}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;

