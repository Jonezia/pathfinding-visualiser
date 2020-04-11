import React from 'react'
import './grid.css'
import Node from './node/node'

export default function Grid(props) {
    let myGrid = [];
    let rows = Math.ceil(props.height/props.node_size)
    let cols = Math.ceil(props.width/props.node_size)
    for (let col=0; col<cols; col++) {
        let temprow = []
        for (let row=0; row<rows; row++) {
            temprow.push(0)
        }
        myGrid.push(temprow)
    }

    return(
        <div id="drawArea">
        <svg id="fullGrid">
            {myGrid.map((rowvals,row) => {
                return rowvals.map((value,column) => {
                    return <Node node_size={props.node_size}
                    row={row}
                    column={column}
                    key={row + "." + column}/>})
                })
            }
        </svg>
        </div>
    )
}