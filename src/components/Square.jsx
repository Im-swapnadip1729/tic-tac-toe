const Square = ({ value, onSquareClick, isWinningSquare }) => {
  return (
    <button
      className={`h-20 w-20 sm:h-24 sm:w-24 border-2 flex items-center justify-center text-4xl sm:text-5xl font-bold transition-all duration-200 
        ${
          isWinningSquare
            ? "bg-green-200 border-green-500 dark:bg-green-800 dark:border-green-400"
            : "bg-gray-50 border-gray-300 dark:bg-gray-800 dark:border-gray-600"
        }
        ${value === "X" ? "text-blue-500" : "text-rose-500"}
        ${!value && "hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"} 
        active:scale-95`}
      onClick={onSquareClick}
      disabled={!!value}
    >
      {value}
    </button>
  );
};

export default Square;
