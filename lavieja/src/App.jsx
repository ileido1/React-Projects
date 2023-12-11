import { useState } from 'react'
import './App.css'
import { Square } from './components/square'
import {  TURNS } from './constants'
import { WinnerModal } from './components/WinnerModal'
import confetti from 'canvas-confetti'
import { checkWinnerFrom, checkEndGame, saveGameToStorage } from './logic/board'
import { Board } from './components/Board'
import { useEffect } from 'react'
function App() {
  const [board, setBoard] = useState(() => {
    const localBoard = window.localStorage.getItem('board')
    return localBoard ? JSON.parse(localBoard) : Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })
  const [winner, setWinner] =  useState(null)
  
   const updateBoard = (index) => {
    if (board[index] || winner)return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // guardar aqui partida
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })
    const newwinner = checkWinnerFrom(newBoard);
    if (newwinner) {
      setWinner(newwinner)
      confetti()
    }else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }
  useEffect(() => {
    
  }, [board])
   const resetgame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X);
    setWinner(null);
    window.localStorage.removeItem('board');
    window.localStorage.removeItem('turns');
  }
  return (
    <>
     <main className='board'>
      <h1>La vieja</h1>
      <button onClick={resetgame}>Empezar de nuevo</button>
      <Board board={board} updateBoard={updateBoard}/>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>

      </section>
     <WinnerModal winner={winner} resetgame={resetgame}/>
     </main>
    </>
  )
}

export default App
