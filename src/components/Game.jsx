import { useState } from "react";
import Board from "./Board";

const Game = ({ players, onQuit }) => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  // Score tracking state
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });

  // Calculate current board status
  const { winner, winningLine, isDraw } = calculateWinner(squares);

  const handlePlay = (nextSquares) => {
    setSquares(nextSquares);
    setXIsNext(!xIsNext);

    // Check if this move resulted in a win or draw to update scores
    const nextStatus = calculateWinner(nextSquares);
    if (nextStatus.winner === "X") {
      setScores((prev) => ({ ...prev, X: prev.X + 1 }));
    } else if (nextStatus.winner === "O") {
      setScores((prev) => ({ ...prev, O: prev.O + 1 }));
    } else if (nextStatus.isDraw) {
      setScores((prev) => ({ ...prev, draws: prev.draws + 1 }));
    }
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true); // X always starts the new round
  };

  const resetScores = () => {
    setScores({ X: 0, O: 0, draws: 0 });
    resetGame();
  };

  return (
    <div className="flex flex-col items-center py-4 w-full">
      {/* Scoreboard */}
      <div className="flex gap-4 sm:gap-8 mb-8 w-full max-w-md justify-center">
        {/* Player 1 (X) Score */}
        <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 w-28">
          <span className="text-sm font-semibold text-blue-500 truncate w-full text-center">
            {players.X}
          </span>
          <span className="text-3xl font-bold text-gray-800 dark:text-white mt-1">
            {scores.X}
          </span>
          <span className="text-xs text-gray-500 mt-1">Wins</span>
        </div>

        {/* Draws */}
        <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 w-28">
          <span className="text-sm font-semibold text-gray-500">Draws</span>
          <span className="text-3xl font-bold text-gray-800 dark:text-white mt-1">
            {scores.draws}
          </span>
        </div>

        {/* Player 2 (O) Score */}
        <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 w-28">
          <span className="text-sm font-semibold text-rose-500 truncate w-full text-center">
            {players.O}
          </span>
          <span className="text-3xl font-bold text-gray-800 dark:text-white mt-1">
            {scores.O}
          </span>
          <span className="text-xs text-gray-500 mt-1">Wins</span>
        </div>
      </div>

      <Board
        xIsNext={xIsNext}
        squares={squares}
        onPlay={handlePlay}
        players={players}
        winner={winner}
        winningLine={winningLine}
        isDraw={isDraw}
      />

      <div className="flex flex-wrap justify-center gap-4 mt-8">
        <button
          onClick={resetGame}
          className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full shadow-md transition-transform hover:-translate-y-0.5 active:scale-95"
        >
          Next Round
        </button>
        <button
          onClick={resetScores}
          className="px-6 py-2 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-full shadow-md transition-transform hover:-translate-y-0.5 active:scale-95"
        >
          Reset Scores
        </button>
        <button
          onClick={onQuit}
          className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 font-semibold rounded-full shadow-md transition-transform hover:-translate-y-0.5 active:scale-95"
        >
          Change Players
        </button>
      </div>
    </div>
  );
};

// Moved helper function to Game.jsx so it can be used for scoring
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Cols
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], winningLine: [a, b, c], isDraw: false };
    }
  }

  const isDraw = !squares.includes(null);
  return { winner: null, winningLine: null, isDraw };
}

export default Game;
