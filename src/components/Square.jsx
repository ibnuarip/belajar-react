import { motion, AnimatePresence } from 'framer-motion';
import { X, Circle } from 'lucide-react';

export default function Square({ value, onSquareClick, isWinningSquare }) {
  return (
    <button 
      className={`square ${isWinningSquare ? 'winning-square' : ''} ${value ? (value === 'X' ? 'x-marker' : 'o-marker') : ''}`}
      onClick={onSquareClick}
      disabled={!!value}
    >
      <AnimatePresence mode="wait">
        {value === 'X' && (
          <motion.div
            key="X"
            initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <X size={44} strokeWidth={3.5} />
          </motion.div>
        )}
        {value === 'O' && (
          <motion.div
            key="O"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Circle size={40} strokeWidth={3.5} />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
