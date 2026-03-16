export default function Square({value, onSquareClick, isWinningSquare}) {
  const isX = value === 'X';
  const isO = value === 'O';
  
  return (
    <button 
      className={`square ${isX ? 'x-marker' : ''} ${isO ? 'o-marker' : ''} ${isWinningSquare ? 'winning-square' : ''}`} 
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}
