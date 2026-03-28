import Square from './Square';
import { motion } from 'framer-motion';

export default function Board({ squares, onPlay, winLine }) {
  const renderSquare = (i) => {
    return (
      <Square 
        key={i}
        value={squares[i]} 
        onSquareClick={() => onPlay(i)}
        isWinningSquare={winLine.includes(i)}
      />
    );
  };

  return (
    <motion.div 
      className="board"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => renderSquare(i))}
    </motion.div>
  );
}
