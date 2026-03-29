// Initialize AudioContext lazily
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

/**
 * Enhanced Procedural Sound Effects Generator
 * @param {string} type - 'click_x', 'click_o', 'win', 'lose', 'draw'
 */
export const playSfx = (type) => {
  const ctx = getAudioContext();
  if (ctx.state === 'suspended') ctx.resume();

  const playNote = (freq, type, duration, startTime = ctx.currentTime, volume = 0.1) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);
    
    // Smooth ADSR envelope
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(volume, startTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration);
  };

  const now = ctx.currentTime;

  switch (type) {
    case 'click_x':
      // Higher pitched snappy click
      playNote(800, 'sine', 0.05, now, 0.15);
      playNote(1200, 'triangle', 0.03, now, 0.05);
      break;

    case 'click_o':
      // Lower pitched mellow click
      playNote(400, 'sine', 0.08, now, 0.15);
      playNote(600, 'triangle', 0.05, now, 0.05);
      break;

    case 'win':
      // Triumphant major arpeggio (C4 -> E4 -> G4 -> C5)
      playNote(261.63, 'triangle', 0.3, now, 0.1);       // C4
      playNote(329.63, 'triangle', 0.3, now + 0.1, 0.1); // E4
      playNote(392.00, 'triangle', 0.3, now + 0.2, 0.1); // G4
      playNote(523.25, 'triangle', 0.5, now + 0.3, 0.15); // C5
      break;

    case 'lose':
      // Somber downward minor arpeggio (G3 -> Eb3 -> C3)
      playNote(196.00, 'sawtooth', 0.4, now, 0.08);       // G3
      playNote(155.56, 'sawtooth', 0.4, now + 0.2, 0.08); // Eb3
      playNote(130.81, 'sawtooth', 0.6, now + 0.4, 0.1);  // C3
      break;

    case 'draw':
      // Neutral "techy" double beep
      playNote(440, 'sine', 0.15, now, 0.1);    // A4
      playNote(440, 'sine', 0.15, now + 0.2, 0.1); // A4 repeat
      break;

    case 'click': // Fallback for old calls
      playNote(600, 'sine', 0.05, now, 0.1);
      break;

    default:
      break;
  }
};
