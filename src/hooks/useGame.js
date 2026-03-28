import { useState, useEffect, useCallback } from 'react';
import { calculateWinner, getBestMove } from '../utils/gameLogic';
import useSound from 'use-sound';

export function useGame() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [gameMode, setGameMode] = useState('pvp'); // 'pvp', 'easy', 'hard'
  const [scores, setScores] = useState({ X: 0, O: 0, Draw: 0 });
  const [showModal, setShowModal] = useState(false);
  const [isAiThinking, setIsAiThinking] = useState(false);

  // Sound Effects
  const [playClick] = useSound('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3', { volume: 0.5 });
  const [playWin] = useSound('https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3', { volume: 0.5 });
  const [playDraw] = useSound('https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3', { volume: 0.5 });

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const winInfo = calculateWinner(currentSquares);
  const winner = winInfo ? winInfo.winner : null;
  const isDraw = !winner && currentSquares.every(s => s !== null);
  const isGameOver = !!winner || isDraw;

  // Handle AI Move
  useEffect(() => {
    if (!xIsNext && (gameMode === 'easy' || gameMode === 'hard') && !isGameOver) {
      setIsAiThinking(true);
      const timer = setTimeout(() => {
        const move = getBestMove(currentSquares, 'O', gameMode);
        if (move !== undefined) {
          handlePlay(move, true);
        }
        setIsAiThinking(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [xIsNext, gameMode, currentSquares, isGameOver]);

  // Update scores when game ends
  useEffect(() => {
    if (isGameOver) {
      if (winner) {
        setScores(prev => ({ ...prev, [winner]: prev[winner] + 1 }));
        playWin();
      } else if (isDraw) {
        setScores(prev => ({ ...prev, Draw: prev.Draw + 1 }));
        playDraw();
      }
      const modalTimer = setTimeout(() => setShowModal(true), 500);
      return () => clearTimeout(modalTimer);
    }
  }, [isGameOver, winner, isDraw, playWin, playDraw]);

  const handlePlay = useCallback((i, isAi = false) => {
    if (currentSquares[i] || isGameOver) return;

    if (!isAi) playClick();

    const nextSquares = currentSquares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';

    if (isAi) playClick();

    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }, [currentSquares, currentMove, history, isGameOver, xIsNext, playClick]);

  const jumpTo = (nextMove) => {
    setCurrentMove(nextMove);
    setShowModal(false);
  };

  const resetGame = () => {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setShowModal(false);
  };

  const resetScores = () => {
    setScores({ X: 0, O: 0, Draw: 0 });
  };

  return {
    squares: currentSquares,
    xIsNext,
    currentMove,
    history,
    winner,
    winLine: winInfo ? winInfo.line : [],
    isGameOver,
    isDraw,
    scores,
    gameMode,
    setGameMode,
    showModal,
    setShowModal,
    isAiThinking,
    handlePlay,
    jumpTo,
    resetGame,
    resetScores
  };
}
