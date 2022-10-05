import { useState, useEffect } from 'react'
import "./Game.css"
import Board from "../Board/Board.js"

import Button from '@mui/material/Button';


const Game = () => {
    const [gameSize, setGameSize] = useState({
        row: 12,
        col: 12
    })
    const [gameState, setGameState] = useState({
        history: [
            {
                squares: (gameSize.col >= 5 && gameSize.row >= 5) ?
                    Array(gameSize.col * gameSize.row).fill(null) : 1,
                locations: null,
                results: null,
                highlight: null
            }
        ],
        stepNumber: 0,
        xIsNext: true,
        isBoldPrevMove: false
    })
    const [isAscendingOrder, setOrder] = useState(true)

    const handleClick = (rowCheck, colCheck) => {
        const history = gameState.history.slice(0, gameState.stepNumber + 1)
        const current = history[history.length - 1]
        let squares = current.squares.slice()
        let locations = current.locations
        let results = current.results
        let highlight = current.highlight
        let i = rowCheck * gameSize.col + colCheck

        if (results !== null || squares[i])
            return;

        squares[i] = gameState.xIsNext ? "X" : "O"
        locations = { row: rowCheck, col: colCheck }
        let calculate = calculateWinner(squares, rowCheck, colCheck)
        results = calculate.result
        highlight = calculate.highlight

        setGameState({
            history: history.concat([
                {
                    squares: squares,
                    locations: locations,
                    results: results,
                    highlight: highlight,
                }
            ]),
            stepNumber: history.length,
            xIsNext: !gameState.xIsNext,
            isBoldPrevMove: false
        });

    }

    const jumpTo = (step) => {
        setGameState({
            ...gameState,
            stepNumber: step,
            xIsNext: (step % 2) === 0,
            isBoldPrevMove: true
        });
    }

    const calculateWinner = (squares, rowCheck, colCheck) => {
        const checkSquare = { row: rowCheck, col: colCheck }
        const i = rowCheck * gameSize.col + colCheck
        const indexCalculate = (row, col) => {
            return row * gameSize.col + col
        }
        let count = 1;
        let highlight = [checkSquare]

        // Check horizontal ← →
        for (let nextColToLeft = checkSquare.col - 1; nextColToLeft >= 0; nextColToLeft--)
            if (squares[indexCalculate(checkSquare.row, nextColToLeft)] === squares[i]) {
                count++
                highlight.push({ col: nextColToLeft, row: checkSquare.row })
            }
            else break

        for (let nextColToRight = checkSquare.col + 1; nextColToRight < gameSize.col; nextColToRight++) {
            if (squares[indexCalculate(checkSquare.row, nextColToRight)] === squares[i]) {
                highlight.push({ col: nextColToRight, row: checkSquare.row })
                count++
            }
            else break
        }

        if (count >= 5)
            return { result: "Winner is " + (gameState.xIsNext ? "X" : "O"), highlight: highlight }
        else {
            count = 1
            highlight = [checkSquare]
        }

        // Check vertical ↑ ↓
        for (let nextRowToTop = checkSquare.row - 1; nextRowToTop >= 0; nextRowToTop--)
            if (squares[indexCalculate(nextRowToTop, checkSquare.col)] === squares[i]) {
                highlight.push({ col: checkSquare.col, row: nextRowToTop })
                count++
            }
            else break

        for (let nextRowToBot = checkSquare.row + 1; nextRowToBot < gameSize.row; nextRowToBot++)
            if (squares[indexCalculate(nextRowToBot, checkSquare.col)] === squares[i]) {
                highlight.push({ col: checkSquare.col, row: nextRowToBot })
                count++
            }
            else break

        if (count >= 5)
            return { result: "Winner is " + (gameState.xIsNext ? "X" : "O"), highlight: highlight }
        else {
            count = 1
            highlight = [checkSquare]
        }

        // Check diagonal \
        for (let nextSquare = { row: checkSquare.row - 1, col: checkSquare.col - 1 };
            nextSquare.row >= 0 && nextSquare.col >= 0;
            nextSquare = { row: nextSquare.row - 1, col: nextSquare.col - 1 })
            if (squares[indexCalculate(nextSquare.row, nextSquare.col)] === squares[i]) {
                highlight.push(nextSquare)
                count++
            }
            else break

        for (let nextSquare = { row: checkSquare.row + 1, col: checkSquare.col + 1 };
            nextSquare.row < gameSize.row && nextSquare.col < gameSize.col;
            nextSquare = { row: nextSquare.row + 1, col: nextSquare.col + 1 })
            if (squares[indexCalculate(nextSquare.row, nextSquare.col)] === squares[i]) {
                highlight.push(nextSquare)
                count++
            }
            else break

        if (count >= 5)
            return { result: "Winner is " + (gameState.xIsNext ? "X" : "O"), highlight: highlight }
        else {
            count = 1
            highlight = [checkSquare]
        }

        // Check diagonal /
        for (let nextSquare = { row: checkSquare.row + 1, col: checkSquare.col - 1 };
            nextSquare.row < gameSize.row && nextSquare.col >= 0;
            nextSquare = { row: nextSquare.row + 1, col: nextSquare.col - 1 })
            if (squares[indexCalculate(nextSquare.row, nextSquare.col)] === squares[i]) {
                highlight.push(nextSquare)
                count++
            }
            else break

        for (let nextSquare = { row: checkSquare.row - 1, col: checkSquare.col + 1 };
            nextSquare.row >= 0 && nextSquare.col < gameSize.col;
            nextSquare = { row: nextSquare.row - 1, col: nextSquare.col + 1 })
            if (squares[indexCalculate(nextSquare.row, nextSquare.col)] === squares[i]) {
                highlight.push(nextSquare)
                count++
            }
            else break

        if (count >= 5)
            return { result: "Winner is " + (gameState.xIsNext ? "X" : "O"), highlight: highlight }
        else {
            count = 1
            highlight = []
        }

        if (gameState.history.length === gameSize.col * gameSize.row)
            return { result: "Draw!", highlight: highlight }
        else return { result: null, highlight: null }
    }

    const historyInSortOrder = () => {
        if (isAscendingOrder)
            return [...gameState.history]
        return [...gameState.history].reverse()
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    col={gameSize.col}
                    row={gameSize.row}
                    setGameSize={setGameSize}
                    isNotGameStart={gameState.stepNumber !== 0}
                    squares={gameState.history[gameState.stepNumber].squares}
                    highlight={gameState.history[gameState.stepNumber].highlight}
                    boldSquare={gameState.isBoldPrevMove ? gameState.history[gameState.stepNumber].locations : null}
                    onClick={(row, col) => handleClick(row, col)}
                />
            </div>
            <div className="game-info">
                {gameState.history[gameState.stepNumber].results !== null ?
                    <div className="game-notification">{gameState.history[gameState.stepNumber].results}</div> :
                    <div className="game-notification">Next player: {gameState.xIsNext ? "X" : "O"}</div>
                }
                <div className="game-button-wrapper">
                    <Button variant="contained"
                        className="game-sort-button" onClick={() => setOrder(!isAscendingOrder)}>
                        Sort {isAscendingOrder ? "Descending" : "Ascending"}</Button>
                </div>

                <ol>{
                    historyInSortOrder().map((step, index) => {
                        const move = isAscendingOrder ? index : gameState.history.length - index - 1
                        const desc = step.locations === null ?
                            'Go to game start' :
                            'Go to move #' + move + ` → [Row ${step.locations.row + 1}] [Col ${step.locations.col + 1}]`
                        return (
                            <li key={move}>
                                <button className="game-step-button" onClick={() => jumpTo(move)}>{desc}</button>
                            </li>
                        )
                    })
                }</ol>
            </div>
        </div>
    );
}

export default Game;