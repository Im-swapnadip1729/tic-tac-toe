import Square from "./Square";

const Board = ({
  xIsNext,
  squares,
  onPlay,
  players,
  winner,
  winningLine,
  isDraw,
}) => {
  // Determine the visual status banner
  let status;
  if (winner) {
    const winnerName = winner === "X" ? players.X : players.O;
    const loserName = winner === "X" ? players.O : players.X;
    status = `🏆 ${winnerName} Wins!  |  😔 ${loserName} Loses!`;
  } else if (isDraw) {
    status = "It's a Draw! Nobody wins or loses. 🤝";
  } else {
    const currentPlayer = xIsNext ? players.X : players.O;
    const currentSymbol = xIsNext ? "X" : "O";
    status = `Turn: ${currentPlayer} (${currentSymbol})`;
  }

  const handleClick = (i) => {
    // Stop if square is already filled or someone has won
    if (squares[i] || winner) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  };

  const renderSquare = (i) => {
    const isWinningSquare = winningLine?.includes(i);
    return (
      <Square
        key={i}
        value={squares[i]}
        onSquareClick={() => handleClick(i)}
        isWinningSquare={isWinningSquare}
      />
    );
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className={`mb-6 text-lg sm:text-xl font-bold px-6 py-4 rounded-xl shadow-sm transition-colors text-center min-w-[300px]
        ${winner ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-2 border-green-400" : ""}
        ${isDraw ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 border-2 border-yellow-400" : ""}
        ${!winner && !isDraw ? "bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200 border-2 border-transparent" : ""}
      `}
      >
        {status}
      </div>

      <div className="grid grid-cols-3 gap-1 p-2 bg-gray-300 dark:bg-gray-600 rounded-2xl shadow-lg">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => renderSquare(i))}
      </div>
    </div>
  );
};

export default Board;
