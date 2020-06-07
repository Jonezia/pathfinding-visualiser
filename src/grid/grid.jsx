import React,{useState} from 'react'
import './grid.css'
import Node from './node/node'
import {dijkstra, getNodesInShortestPathOrder} from './algorithms'

// let rows = Math.ceil(props.height/props.nodeSize);
// let cols = Math.ceil(props.width/props.nodeSize);

let height = 694
let width = 1536

let nodeSize = 30

let rows = Math.ceil(height/nodeSize)
let cols = Math.ceil(width/nodeSize)

let start = [10,15]
let end = [10,35]

let leftMouseIsPressed = false
let rightMouseIsPressed = false
let running = false

const newGrid = (prows,pcols) => {
    let tempGrid = []
    for (let row=0; row<prows; row++) {
        let temprow = []
        for (let col=0; col<pcols; col++) {
            temprow.push(createNode(row,col))
        }
        tempGrid.push(temprow)
    }
    return tempGrid
}

const createNode = (row, col) => {
    return {
      row,
      col,
      weight: 0,
      isStart: row === start[0] && col === start[1],
      isEnd: row === end[0] && col === end[1],
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
    };
  };

let modelGrid = newGrid(rows,cols)

// Thus, the structure of a grid is
// [ row: [ node: [ isWall: bool, isExplored: bool, weight: 0-9] ]

export default function Grid(props) {
    let date = new Date()

    let delay = (51-props.speed)

    let [myGrid,setMyGrid] = useState(modelGrid)

    const clearTerrain = () => {
        for (let row=0; row < rows; row++) {
            for (let col=0; col < cols; col++) {
                if (modelGrid[row][col].isWall) {
                    modelGrid[row][col].isWall = false
                }
                modelGrid[row][col].weight = 0
            }
        }
        setMyGrid(modelGrid.slice())
    }

    props.setClickClearTerrain(clearTerrain)

    const clearPath = () => {
        for (let row=0; row < rows; row++) {
            for (let col=0; col < cols; col++) {
                if (modelGrid[row][col].isVisited) {
                    modelGrid[row][col].isVisited = false
                }
                modelGrid[row][col].distance = Infinity
                modelGrid[row][col].previousNode = null
            }
        }
        setMyGrid(modelGrid.slice())
    }

    props.setClickClearPath(clearPath)

    const changeNodeSize = (newSize) => {
        let newRows = Math.ceil(height/newSize)
        let newCols = Math.ceil(width/newSize)
        if ((newRows !== rows) || (newCols !== cols)) {
            if (newSize < nodeSize) {
                if (newCols > cols) {
                    for (let row=0; row<rows; row++) {
                        for (let i=0; i<newCols-cols; i++) {
                            modelGrid[row].push(createNode(row,cols+i))
                            }
                        }
                }
                if (newRows > rows) {
                    for (let i=0; i<newRows-rows; i++) {
                        let temprow = []
                        for (let j=0; j<newCols; j++) {
                            temprow.push(createNode(rows+i,j))
                        }
                        modelGrid.push(temprow)
                    }
                }
            } else {
                for (let row=0; row<newRows; row++) {
                    modelGrid[row] = modelGrid[row].slice(0,newCols)
                }
                modelGrid = modelGrid.slice(0,newRows)
            }
            rows = newRows
            cols = newCols
        }
        nodeSize = newSize
        setMyGrid(modelGrid.slice())
    }

    props.setChangeNodeSize(changeNodeSize)

    const toggleWall = (row,col) => {
        if ((leftMouseIsPressed) && !((row === start[0]) && (col === start[1])) &&
        !((row === end[0]) && (col === end[1]))) {
            modelGrid[row][col].isWall = !modelGrid[row][col].isWall
            return true
        } else {
            return false
        }
    }

    const incrementWeight = (row,col) => {
        if ((rightMouseIsPressed) && !((row === start[0]) && (col === start[1])) &&
        !((row === end[0]) && (col === end[1])) && (modelGrid[row][col].weight < 9)
        && !(modelGrid[row][col].isWall)) {
            modelGrid[row][col].weight += 1
            return modelGrid[row][col].weight
        } else {
            return false
        }
    }

    const handleLeftMouseDown = (row,col) => {
        leftMouseIsPressed = true
        return toggleWall(row,col)
    }

    const handleLeftMouseEnter = (row,col) => {
        return toggleWall(row,col)
    }

    const handleLeftMouseUp = () => {
        leftMouseIsPressed = false
    }

    const handleRightMouseDown = (row,col) => {
        rightMouseIsPressed = true
        return incrementWeight(row,col)
    }

    const handleRightMouseEnter = (row,col) => {
        return incrementWeight(row,col)
    }

    const handleRightMouseUp = () => {
        rightMouseIsPressed = false
    }

    const getFrames = () => {
        let startNode = modelGrid[start[0]][start[1]]
        let endNode = modelGrid[end[0]][end[1]]
        clearPath()
        let visitedInOrder = dijkstra(modelGrid,startNode,endNode)
        clearPath()
        console.log(visitedInOrder)
        animateFrames(visitedInOrder)
    }

    props.setClickGetFrames(getFrames)

    const visitNode = (node) => {
        modelGrid[node.row][node.col].isVisited = true
        if (!node.isStart && !node.isEnd) {
            document.getElementById(`${node.row}-${node.col}`).style.fill = "green"
        }
    }

    const animateFrames = (anim) => {
        let runAnimations = () => {
            if (running) {
            if (i === anim.length) {
                running = false
                clearTimeout(timer);
                return
            } else {
                visitNode(anim[i])
                i += 1
                timer = setTimeout(runAnimations, delay)
            }
        }}
        running = true
        let i = 0
        let timer = setTimeout(runAnimations, delay)
    };

    // date.getTime is appended to the key of each node, to change state
    // between re-renders, as otherwise the state of the node is preserved
    // due to states being used for both the grid and the nodes

    return(
        <div id="drawArea">
        <svg id="fullGrid">
            {myGrid.map((rowvals,row) => {
                return rowvals.map((node,column) => {
                    return <Node nodeSize={nodeSize}
                    row={row}
                    column={column}
                    id={`${row}-${column}`}
                    key={`${row}-${column}-${date.getTime()}`}
                    isWall={node.isWall}
                    isExplored={node.isVisited}
                    weight={node.weight}
                    isStart={node.isStart}
                    isEnd={node.isEnd}
                    handleLeftMouseDown={handleLeftMouseDown}
                    handleLeftMouseEnter={handleLeftMouseEnter}
                    handleLeftMouseUp={handleLeftMouseUp}
                    handleRightMouseDown={handleRightMouseDown}
                    handleRightMouseEnter={handleRightMouseEnter}
                    handleRightMouseUp={handleRightMouseUp}/>})
                })
            }
        </svg>
        </div>
    )
}