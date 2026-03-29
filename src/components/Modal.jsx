import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCcw, Trophy, Frown, Minus } from 'lucide-react';

export default function Modal({ isOpen, winner, gameMode, onReset, onClose }) {
  const isLoss = winner === 'O' && gameMode !== 'pvp';
  const isDraw = !winner;
  
  let title = `${winner} Wins!`;
  let description = `Congratulations to Player ${winner} for winning the game!`;
  let modalClass = 'modal-win';
  let Icon = Trophy;

  if (isDraw) {
    title = "It's a Draw!";
    description = "The game ended in a stalemate. Try зagain!";
    modalClass = 'modal-draw';
    Icon = Minus;
  } else if (isLoss) {
    title = "Better Luck Next Time!";
    description = "The CPU outsmarted you this time. Don't give up!";
    modalClass = 'modal-lose';
    Icon = Frown;
  }

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        duration: 0.4, 
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.1
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

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
            className={`modal-content ${modalClass}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div className="modal-icon-container" variants={itemVariants}>
              <motion.div
                animate={isDraw ? { rotate: [0, 10, -10, 0] } : isLoss ? { y: [0, 5, 0] } : { scale: [1, 1.2, 1], rotate: [0, 360, 360, 0] }}
                transition={{ duration: isDraw ? 3 : isLoss ? 4 : 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Icon size={64} className="result-icon" />
              </motion.div>
            </motion.div>
            
            <motion.h2 className="modal-title" variants={itemVariants}>{title}</motion.h2>
            <motion.p className="modal-text" variants={itemVariants}>{description}</motion.p>
            
            <motion.div className="modal-actions" variants={itemVariants}>
              <motion.button 
                className="btn-primary" 
                onClick={onReset}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <RefreshCcw size={18} /> Play Again
                </div>
              </motion.button>
              <motion.button 
                className="btn-secondary" 
                onClick={onClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
