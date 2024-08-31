import { useState } from "react";
import { Board, Tile } from "../../../shared/types";

export const History = () => {
    const [history] = useState<Board[]>([])
    const historyToDisplay =
        history.length === 0 ? Array(9).fill(Array(9).fill(null)) : history;
    return (
        <div className="flex flex-col w-full md:w-1/3 p-4">
            <h1 className="text-[#F3E0EF] text-xl md:text-2xl mb-4 text-left">History</h1>
            <div
                className="grid grid-cols-4 md:grid-cols-3 gap-1 md:gap-1.5 overflow-y-auto max-h-[60vh] md:max-h-[80vh]"
            >
                {historyToDisplay.map((board: Board, historyIndex: number) => (
                    <div
                        key={historyIndex}
                        className="w-full aspect-square bg-[#191919] bg-opacity-20 flex items-center justify-center"
                        style={{ transform: "scale(0.8)" }}
                    >
                        <div className="grid grid-cols-3 gap-0.5 w-full h-full">
                            {board.map((value: Tile, index: number) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-center w-full h-full bg-[#F3E0EF] border border-white text-xs md:text-lg font-bold text-white rounded-sm"
                                >
                                    {value?.toUpperCase()}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )

}