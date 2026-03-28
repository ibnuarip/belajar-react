import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCcw, XCircle } from 'lucide-react';

export default function Modal({ isOpen, winner, onReset, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="modal-content"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <h2 className="modal-title">
              {winner ? `${winner} Wins!` : "It's a Draw!"}
            </h2>
            <p className="modal-text">
              {winner ? `Congratulations to Player ${winner} for winning the game!` : "The game ended in a stalemate. Try again!"}
            </p>
            <div className="modal-actions">
              <motion.button 
                className="btn-primary" 
                onClick={onReset}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <RefreshCcw size={18} /> Play Again
                </div>
              </motion.button>
              <motion.button 
                className="btn-secondary" 
                onClick={onClose}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
