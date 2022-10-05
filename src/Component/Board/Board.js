import "./Board.css"
import Square from "../Square/Square"

import { useEffect } from "react"

const Board = (props) => {
    console.log(props.highlight)
    return (
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
    );
}

export default Board;