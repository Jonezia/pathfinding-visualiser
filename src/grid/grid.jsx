import React,{useState} from 'react'
import './grid.css'
import Node from './node/node'
import {algorithm, getNodesInShortestPathOrder} from './algorithms'

let height = 694
let width = 1536

let nodeSize = 30

let rows = Math.ceil(height/nodeSize)
let cols = Math.ceil(width/nodeSize)

let start = [10,15]
let end = [10,35]
let dragStart = false
let dragEnd = false

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
      isPath: false,
      isWall: false,
      previousNode: null,
    };
  };

let modelGrid = newGrid(rows,cols)

// Thus, the structure of a grid is
// [ row: [ node: {} , node: {} ], row: [ node: {} , node: {} ] ]

export default function Grid(props) {
    let date = new Date()

    let delay = (101-props.speed)

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
                modelGrid[row][col].isVisited = false
                modelGrid[row][col].isPath = false
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
        if ((row === start[0]) && (col === start[1])) {
            dragStart = true
        }
        else if ((row === end[0]) && (col === end[1])) {
            dragEnd = true
        } else {
            return toggleWall(row,col)
        }
    }

    const handleLeftMouseEnter = (row,col) => {
        if (dragStart) {
            modelGrid[start[0]][start[1]].isStart = false
            document.getElementById(`${start[0]}-${start[1]}`).style.fill = "white"
            start = [row,col]
            modelGrid[start[0]][start[1]].isStart = true
            document.getElementById(`${start[0]}-${start[1]}`).style.fill = "rgba(255,60,60,1)"
        } else if (dragEnd) {
            modelGrid[end[0]][end[1]].isEnd = false
            document.getElementById(`${end[0]}-${end[1]}`).style.fill = "white"
            end = [row,col]
            modelGrid[end[0]][end[1]].isEnd = true
            document.getElementById(`${end[0]}-${end[1]}`).style.fill = "rgba(180,65,255,1)"
        } else {
            return toggleWall(row,col)
        }
    }

    const handleLeftMouseUp = () => {
        dragStart = false
        dragEnd = false
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

    const visitNode = (node) => {
        modelGrid[node.row][node.col].isVisited = true
        if (!node.isStart && !node.isEnd) {
            document.getElementById(`${node.row}-${node.col}`).style.fill = "rgb(206,250,5)"
        }
    }

    const setPath = (node) => {
        modelGrid[node.row][node.col].isPath = true
        if (!node.isStart && !node.isEnd) {
            document.getElementById(`${node.row}-${node.col}`).style.fill = "rgb(255,190,28)"
        }
    }

    const getFrames = () => {
        if (!props.algorithm) return;
        let startNode = modelGrid[start[0]][start[1]]
        let endNode = modelGrid[end[0]][end[1]]
        clearPath()
        let [visitedInOrder,work] = algorithm(modelGrid,startNode,endNode,
            props.algorithm,props.heuristic,props.heuristicStrength,
            props.diagonal,props.corner)
        let nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode)
        clearPath()
        if (visitedInOrder) {animateNodes(visitedInOrder,nodesInShortestPathOrder,work)}
    }

    props.setClickGetFrames(getFrames)

    const updateStats = (visited,steps,work) => {
        document.getElementById("statsVisited").innerHTML = "Visited: " + visited.toString()
        document.getElementById("statsSteps").innerHTML = "Steps: " + steps.toString()
        document.getElementById("statsWork").innerHTML = "Work: " + work.toString()
    }

    const animateNodes = (visitedInOrder,nodesInShortestPathOrder,work) => {
        let runAnimations = () => {
            if (running) {
                if (i === visitedInOrder.length) {
                    animatePath(visitedInOrder,nodesInShortestPathOrder,work)
                } else {
                    visitNode(visitedInOrder[i])
                    i += 1
                    timer = setTimeout(runAnimations, delay)
                }
            } else {
                clearTimeout(timer);
                return
            }
        }
        running = true
        let i = 0
        let timer = setTimeout(runAnimations, delay)
    };

    const animatePath = (visitedInOrder,nodesInShortestPathOrder,work) => {
        let runAnimations = () => {
            if (running) {
                if (i === nodesInShortestPathOrder.length) {
                    running = false
                    updateStats(visitedInOrder.length-1,
                        nodesInShortestPathOrder.length-1,work)
                } else {
                    setPath(nodesInShortestPathOrder[i])
                    i += 1
                    timer = setTimeout(runAnimations, delay)
                }
            } else {
                clearTimeout(timer);
                return
            }
        }
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
                    isPath={node.isPath}
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