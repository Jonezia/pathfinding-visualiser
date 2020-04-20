import React,{useState} from 'react'
import './grid.css'
import Node from './node/node'

export default function Grid(props) {
    let rows = Math.ceil(props.height/props.nodeSize);
    let cols = Math.ceil(props.width/props.nodeSize);

    let tempGrid = [];
    for (let row=0; row<24; row++) {
        let temprow = []
        for (let col=0; col<52; col++) {
            temprow.push(false)
        }
        tempGrid.push(temprow)
    }

    let modelGrid = tempGrid.slice()

    let [myGrid,setMyGrid] = useState(tempGrid)

    const clearTerrain = () => {
        // let newGrid = myGrid.slice()
        // for (let row=0; row<newGrid.length; row++) {
        //     for (let col=0; col<row.length; col++) {
        //         if (newGrid[row][col]) {
        //             newGrid[row][col] = !newGrid[row][col]
        //         }
        //     }
        // }
        // setMyGrid(newGrid)
        // console.log("clearterrain pressed")
        console.log(modelGrid)
        setMyGrid([[false,false,true,true,true]])
    }

    props.setClickClearTerrain(clearTerrain)

    // let start = [Math.floor(rows/2)-1,Math.floor(cols/3)-1]
    // let end = [Math.floor(rows/2)-1,Math.floor(cols*2/3)-1]
    let start = [10,15]
    let end = [10,35]

    let mouseIsPressed = false

    const toggleWall = (row,col) => {
        if ((mouseIsPressed) && !((row === start[0]) && (col === start[1])) &&
        !((row === end[0]) && (col === end[1]))) {
            modelGrid[row][col] = !modelGrid[row][col]
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
                return rowvals.map((wall,column) => {
                    return <Node nodeSize={props.nodeSize}
                    row={row}
                    column={column}
                    key={row + "." + column}
                    initialColor={(wall === true) ? "black" : 
                        (row === start[0] && column === start[1]) ? "red" :
                        (row === end[0] && column === end[1]) ? "purple" : "white"}
                    handleMouseDown={handleMouseDown}
                    handleMouseEnter={handleMouseEnter}
                    handleMouseUp={handleMouseUp}/>})
                })
            }
        </svg>
        </div>
    )
}