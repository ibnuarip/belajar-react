import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Board from './Board';
import Modal from './Modal';
import Scoreboard from './Scoreboard';
import ModeSelector from './ModeSelector';
import { useGame } from '../hooks/useGame';
import confetti from 'canvas-confetti';
import { RefreshCcw, Home, Settings } from 'lucide-react';

export default function App() {
  const [view, setView] = useState('landing'); // 'landing', 'game'
  const {
    squares,
    xIsNext,
    winner,
    winLine,
    isGameOver,
    scores,
    gameMode,
    setGameMode,
    showModal,
    setShowModal,
    isAiThinking,
    handlePlay,
    resetGame,
    jumpTo,
    history
  } = useGame();

  // Trigger confetti on win
  useEffect(() => {
    if (winner && showModal) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min, max) => Math.random() * (max - min) + min;

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);
    }
  }, [winner, showModal]);

  const status = winner 
    ? `Winner: ${winner}` 
    : isGameOver 
      ? "It's a Draw!" 
      : `${xIsNext ? "X's" : "O's"} Turn ${isAiThinking ? "(Thinking...)" : ""}`;

  return (
    <div className="game-container">
      <AnimatePresence mode="wait">
        {view === 'landing' ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="game-title">Tic Tac Toe</h1>
            <ModeSelector 
              currentMode={gameMode} 
              onSelect={setGameMode} 
              onStart={() => {
                resetGame();
                setView('game');
              }} 
            />
          </motion.div>
        ) : (
          <motion.div
            key="game"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: 20 }}
            className="game-layout"
          >
            <div className="game-header">
              <button className="icon-btn" onClick={() => setView('landing')}>
                <Home size={20} />
              </button>
              <h1 className="game-title small">Tic Tac Toe</h1>
              <button className="icon-btn" onClick={resetGame}>
                <RefreshCcw size={20} />
              </button>
            </div>

            <Scoreboard scores={scores} gameMode={gameMode} />

            <div className={`status-badge ${xIsNext ? 'x-turn' : 'o-turn'}`}>
              {status}
            </div>

            <div className="game-board-wrapper">
              <Board 
                squares={squares} 
                onPlay={handlePlay} 
                winLine={winLine} 
              />
            </div>

            <div className="game-footer">
               <div className="history-control">
                  <h4 className="history-title">History</h4>
                  <div className="history-scroll">
                    {history.map((_, move) => (
                      <button 
                        key={move} 
                        className={`history-btn ${move === history.length - 1 ? 'active' : ''}`}
                        onClick={() => jumpTo(move)}
                      >
                        {move === 0 ? 'Start' : move}
                      </button>
                    ))}
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Modal 
        isOpen={showModal} 
        winner={winner} 
        gameMode={gameMode}
        onReset={resetGame} 
        onClose={() => setShowModal(false)} 
      />
    </div>
  );
}
