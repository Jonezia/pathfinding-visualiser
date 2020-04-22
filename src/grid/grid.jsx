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
        // Using arrays to store node data instead of objects due to speed.
        // Node = [state,weight]
        // state = 0: default, 1: wall, 2: explored, 3: fringe
        //weight = integer 0-5, how much "effort" it takes to expand a node
            temprow.push([0,0])
        }
        tempGrid.push(temprow)
    }

    // Thus, the structure of a grid is [ row: [ node: [ state: 0-3, weight: 0-5] ]

    let modelGrid = tempGrid.slice()

    let [myGrid,setMyGrid] = useState(tempGrid)

    const clearTerrain = () => {
        let newGrid = myGrid.slice()
        for (let row=0; row<newGrid.length; row++) {
            for (let col=0; col<row.length; col++) {
                if (newGrid[row][col][0] === 1) {
                    newGrid[row][col][0] = 0
                }
            }
        }
        modelGrid = newGrid
        setMyGrid(modelGrid)
    }

    props.setClickClearTerrain(clearTerrain)

    // let start = [Math.floor(rows/2)-1,Math.floor(cols/3)-1]
    // let end = [Math.floor(rows/2)-1,Math.floor(cols*2/3)-1]
    let start = [10,15]
    let end = [10,35]

    let mouseIsPressed = false
    let running = false
    let delay = 100
    let date = new Date()

    const toggleWall = (row,col) => {
        if ((mouseIsPressed) && !((row === start[0]) && (col === start[1])) &&
        !((row === end[0]) && (col === end[1]))) {
            modelGrid[row][col][0] = !modelGrid[row][col][0]
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

    const animate = (animation) => {
        // let frames = generateFrames(algorithm, myArray)
        let frames = [
            [ [[0,0],[0,0],[1,0]],
              [[0,0],[0,0],[1,0]] ],
            [ [[1,0],[1,0],[0,0]],
              [[0,0],[0,0]] ],
            [ [[1,0]],
              [[0,0]]]
        ]
        let runAnimations = () => {
            if (running) {
            if (i === frames.length) {
                running = false
                clearTimeout(timer);
            } else {
                setMyGrid(frames[i]);
                i += 1
                timer = setTimeout(runAnimations, delay)
            }
        }}
        running = true
        let timer = setTimeout(runAnimations, delay)
        let i = 0
    };

    // date.getTime is appended to the key of each node, to change state
    // between re-renders, as otherwise the state of the node is preserved
    // due to states being used for both the grid and the nodes

    return(
        <div id="drawArea">
        <svg id="fullGrid">
            {myGrid.map((rowvals,row) => {
                return rowvals.map((node,column) => {
                    return <Node nodeSize={props.nodeSize}
                    row={row}
                    column={column}
                    key={`${row}-${column}-${date.getTime()}`}
                    state={node[0]}
                    weight={node[1]}
                    isStart={(row === start[0] && column === start[1])}
                    isEnd={(row === end[0] && column === end[1])}
                    handleMouseDown={handleMouseDown}
                    handleMouseEnter={handleMouseEnter}
                    handleMouseUp={handleMouseUp}/>})
                })
            }
        </svg>
        </div>
    )
}