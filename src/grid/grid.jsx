import React from 'react'
import './grid.css'
import Node from './node/node'

export default function Grid(props) {
    let myGrid = [];
    let rows = Math.ceil(props.height/props.node_size)
    let cols = Math.ceil(props.width/props.node_size)
    for (let row=0; row<rows; row++) {
        let temprow = []
        for (let col=0; col<cols; col++) {
            temprow.push(false)
        }
        myGrid.push(temprow)
    }

    let start = [Math.floor(rows/2)-1,Math.floor(cols/3)-1]
    let end = [Math.floor(rows/2)-1,Math.floor(cols*2/3)-1]

    let mouseIsPressed = false

    const toggleWall = (row,col) => {
        if ((mouseIsPressed) && !((row === start[0]) && (col === start[1])) &&
        !((row === end[0]) && (col === end[1]))) {
            myGrid[row][col] = !myGrid[row][col]
            return true
        } else {
            return false
        }
    }

    const handleMouseDown = (row,col) => {
        mouseIsPressed = true
        return toggleWall(row,col)
    }

    const handleMouseEnter = (row,col) => {
        return toggleWall(row,col)
    }

    const handleMouseUp = () => {
        mouseIsPressed = false
    }

    return(
        <div id="drawArea">
        <svg id="fullGrid">
            {myGrid.map((rowvals,row) => {
                return rowvals.map((value,column) => {
                    return <Node node_size={props.node_size}
                    row={row}
                    column={column}
                    key={row + "." + column}
                    isStart={row === start[0] && column === start[1]}
                    isEnd={row === end[0] && column === end[1]}
                    handleMouseDown={handleMouseDown}
                    handleMouseEnter={handleMouseEnter}
                    handleMouseUp={handleMouseUp}/>})
                })
            }
        </svg>
        </div>
    )
}