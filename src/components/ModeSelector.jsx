import { motion } from 'framer-motion';
import { User, Cpu, Zap, Trophy } from 'lucide-react';

export default function ModeSelector({ currentMode, onSelect, onStart }) {
  const modes = [
    { id: 'pvp', title: 'Player vs Player', icon: <User size={32} />, desc: 'Local Multiplayer' },
    { id: 'easy', title: 'Player vs AI (Easy)', icon: <Cpu size={32} />, desc: 'Relaxed bot' },
    { id: 'hard', title: 'Player vs AI (Hard)', icon: <Zap size={32} />, desc: 'Unbeatable bot' },
  ];

  return (
    <motion.div 
      className="mode-selector"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <h2 className="selector-title">Select Game Mode</h2>
      <div className="mode-options">
        {modes.map((mode) => (
          <motion.div
            key={mode.id}
            className={`mode-card ${currentMode === mode.id ? 'active' : ''}`}
            onClick={() => onSelect(mode.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="mode-icon">{mode.icon}</div>
            <div className="mode-info">
              <h3>{mode.title}</h3>
              <p>{mode.desc}</p>
            </div>
            {currentMode === mode.id && <div className="active-dot" />}
          </motion.div>
        ))}
      </div>
      <motion.button 
        className="btn-start"
        onClick={onStart}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Start Game
      </motion.button>
    </motion.div>
  );
}
