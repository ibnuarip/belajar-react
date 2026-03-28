import { motion } from 'framer-motion';
import { User, Cpu, Trophy } from 'lucide-react';

export default function Scoreboard({ scores, gameMode }) {
  const isAi = gameMode === 'easy' || gameMode === 'hard';

  return (
    <div className="scoreboard">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="score-card x-score"
      >
        <div className="score-icon"><User size={20} /></div>
        <div className="score-label">Player X</div>
        <div className="score-value">{scores.X}</div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="score-card draw-score"
      >
        <div className="score-icon"><Trophy size={20} /></div>
        <div className="score-label">Draws</div>
        <div className="score-value">{scores.Draw}</div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="score-card o-score"
      >
        <div className="score-icon">{isAi ? <Cpu size={20} /> : <User size={20} />}</div>
        <div className="score-label">{isAi ? 'CPU (O)' : 'Player O'}</div>
        <div className="score-value">{scores.O}</div>
      </motion.div>
    </div>
  );
}
