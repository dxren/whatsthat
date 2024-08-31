import React, { useEffect } from "react";
import useGame from "./hooks/useGame";
import { useState } from 'react'
import './App.css'

const App: React.FC = () => {
  const { game, makeMove, getDailyRuleset, currentPlayer } = useGame();
  const [rulesetId, setRulesetId] = useState<string>('');

  useEffect(() => {
    (async () => {{
        const rulesetId = await getDailyRuleset();
        setRulesetId(rulesetId);
    }})();
  }, []);

  return (
    <div className="flex flex-row min-h-screen bg-black p-8">
      {/* Left Side: Game Board and Player Selection */}
      <div className="flex flex-col items-center justify-center w-2/3 m-7">
        <h1 className="text-white text-4xl font-bold mb-6">Let's Play!</h1>
        <div
          className="grid grid-cols-3 gap-1 bg-gray-300 bg-opacity-20 border border-white"
          style={{ width: "500px", height: "500px" }}
        >
          {game.map((value: "x" | "o" | null, index: number) => (
            <div
              key={index}
              onClick={() => makeMove(index, currentPlayer, rulesetId)}
              className="flex items-center justify-center w-full h-full bg-gray-300 border border-white text-4xl font-bold text-white cursor-pointer"
            >
              {value?.toUpperCase()}
            </div>
          ))}
        </div>

        <div className="flex mt-6 space-x-4">
          <span className="text-white text-2xl font-bold">
            Current Player: {currentPlayer.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Right Side: History Section */}
      <div className="flex flex-col w-1/3 p-4">
        <h1 className="text-white text-2xl mb-4">History</h1>
        <div
          className="grid grid-cols-2 gap-x-2.5 gap-y-4 overflow-y-auto"
          style={{ maxHeight: "80vh" }}
        >
          {/* Placeholder for history boards */}
        </div>
      </div>
    </div>
  );
};

export default App;
