import "./Board.css"
import Square from "../Square/Square"

import { useEffect } from "react";

const Board = (props) => {

    let temp

    return (
        <>
            <div className="board-size-config">
                <span> Row: </span>
                    <input className="board-input"
                    type="number" placeholder="Input row number" 
                    value={props.row} 
                    disabled={props.isNotGameStart}
                    onChange={event => props.setGameSize({row: parseInt(event.target.value), col: props.col})}></input>
                
                <span> Col: </span>
                    <input className="board-input"
                    type="number" placeholder="Input col number" 
                    value={props.col} 
                    disabled={props.isNotGameStart}
                    onChange={event => props.setGameSize({row: props.row, col: parseInt(event.target.value)})}></input>
                
            </div>
            <div className="board-container">
                { props.col >= 5 && props.col <= 20 && props.row >= 5 && props.row <= 20 &&
                <div>
                    {
                        [...Array(props.row)].map((row, row_index) =>
                            <div className="board-row" key={row_index}>
                                {
                                    [...Array(props.col)].map((col, col_index) =>
                                        <Square key={col_index}
                                            isBold={props.boldSquare !== null && props.boldSquare.row === row_index && props.boldSquare.col === col_index}
                                            isHighlight={props.highlight !== null && props.highlight.filter(each => each.row === row_index && each.col === col_index).length > 0}
                                            value={props.squares[row_index * props.col + col_index]}
                                            onClick={() => props.onClick(row_index, col_index)}
                                        />)
                                }
                            </div>)
                    }                    
                </div>
                }
            </div>
        </>

    );
}

export default Board;