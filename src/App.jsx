import { useState, useEffect } from "react";
import Game from "./components/Game";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [players, setPlayers] = useState({ X: "", O: "" });
  const [isGameStarted, setIsGameStarted] = useState(false);

  // Check system preference on first load
  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleStartGame = (e) => {
    e.preventDefault();
    if (players.X.trim() && players.O.trim()) {
      setIsGameStarted(true);
    }
  };

  const handleQuit = () => {
    setIsGameStarted(false);
    setPlayers({ X: "", O: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 flex flex-col items-center justify-center p-4">
      {/* Theme Toggle Button */}
      <div className="absolute top-4 right-4 sm:top-8 sm:right-8">
        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded-full font-medium shadow-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
        >
          {isDarkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-rose-500 mb-2">
          Tic Tac Toe
        </h1>
      </div>

      {/* Screen Routing */}
      {!isGameStarted ? (
        <form
          onSubmit={handleStartGame}
          className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100 dark:border-gray-700"
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
            Enter Player Names
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-blue-500 mb-1">
                Player 1 (X)
              </label>
              <input
                type="text"
                required
                placeholder="Enter name..."
                value={players.X}
                onChange={(e) => setPlayers({ ...players, X: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-rose-500 mb-1">
                Player 2 (O)
              </label>
              <input
                type="text"
                required
                placeholder="Enter name..."
                value={players.O}
                onChange={(e) => setPlayers({ ...players, O: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-8 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-md transition-transform hover:-translate-y-0.5 active:scale-95"
          >
            Start Game
          </button>
        </form>
      ) : (
        <Game players={players} onQuit={handleQuit} />
      )}
    </div>
  );
}

export default App;
