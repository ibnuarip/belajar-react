import Square from './Square';
import { calculateWinner } from '../utils/gameLogic';

export default function Board({xIsNext, squares, onPlay}) {

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  const winInfo = calculateWinner(squares);
  const winner = winInfo ? winInfo.winner : null;
  const winningLine = winInfo ? winInfo.line : [];
  
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (squares.every(s => s)) {
    status = "Draw!";
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  const renderSquare = (i) => {
    return (
      <Square 
        key={i}
        value={squares[i]} 
        onSquareClick={() => handleClick(i)}
        isWinningSquare={winningLine.includes(i)}
      />
    );
  };

  return (
    <>
      <div className="status">{status}</div>
      <div className="board">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => renderSquare(i))}
      </div>
    </>
  );
}
