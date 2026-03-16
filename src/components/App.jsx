import { useState } from 'react';
import Board from './Board';
import Modal from './Modal';
import { calculateWinner } from '../utils/gameLogic';

export default function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [showModal, setShowModal] = useState(false);
  
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const winInfo = calculateWinner(currentSquares);
  const winner = winInfo ? winInfo.winner : null;

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setShowModal(false);
  }

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    
    // Check for game over in the next state
    const winInfo = calculateWinner(nextSquares);
    if (winInfo || nextSquares.every(s => s !== null)) {
      setTimeout(() => setShowModal(true), 500);
    }
  }

  function resetGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setShowModal(false);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <h1 className="game-title">Tic Tac Toe</h1>
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>

      <Modal 
        isOpen={showModal} 
        winner={winner} 
        onReset={resetGame} 
        onClose={() => setShowModal(false)} 
      />
    </div>
  );
}
