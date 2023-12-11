import { Square } from "./square"
export function WinnerModal({winner, resetgame}) {
if (winner === null) return null
const winnertext=  winner === false ? 'Empate' : 'Ganó:'
return(    
    <div className='winner'>
      <div className="text">
      <span>{winnertext}</span>
      {winner && 
      <div className="win">
      <Square>{winner}</Square>
      </div>
      } 
      <footer>
        <button onClick={resetgame}>Empezar de nuevo</button>
      </footer>
    </div>
    </div>
  )}
