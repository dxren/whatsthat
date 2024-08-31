import React, { useEffect, useState } from "react";
import useGame from "./hooks/useGame";
import "./App.css";
import { History } from "./components/History";
// import { Board } from "../../shared/types";

const App: React.FC = () => {
  const { game, makeMove, getDailyRuleset, currentPlayer } = useGame();

  const [rulesetId, setRulesetId] = useState<string | null>(null);
  // const [history] = useState<Board[]>([]);

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

              onClick={() => { if (rulesetId) makeMove(index, currentPlayer, rulesetId) }}
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
            Current Player: {currentPlayer.toUpperCase()}
          </span>
        </div>
      </div>

      {/* History Section */}
      <History />
    </div>
  );
};

export default App;

