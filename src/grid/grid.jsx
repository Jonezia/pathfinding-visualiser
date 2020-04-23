import React,{useState} from 'react'
import './grid.css'
import Node from './node/node'

export default function Grid(props) {
    let rows = Math.ceil(props.height/props.nodeSize);
    let cols = Math.ceil(props.width/props.nodeSize);

    const newGrid = () => {
        let tempGrid = []
        for (let row=0; row<24; row++) {
            let temprow = []
            for (let col=0; col<52; col++) {
            // Using arrays to store node data instead of objects due to speed.
            // Node = [isWall,isExplored,weight]
            // isWall, isExplored, boolean
            //weight = integer 0-9, how much "effort" it takes to expand a node
                temprow.push([false,false,0])
            }
            tempGrid.push(temprow)
        }
        return tempGrid
    }

    // Thus, the structure of a grid is
    // [ row: [ node: [ isWall: bool, isExplored: bool, weight: 0-9] ]

    let modelGrid = newGrid()

    modelGrid = [
        [[false,false,0],[false,false,1],[false,false,2],[false,false,3],[false,false,4],
        [false,false,5],[false,false,6],[false,false,7],[false,false,8],[false,false,9]],
        [[true,true,0],[true,false,0],[false,true,0],[false,false,0]],
        [[true,true,5],[true,false,5],[false,true,5],[false,false,5]]
    ]

    let [myGrid,setMyGrid] = useState(modelGrid)

    const updateModelGridClearTerrain = (grid) => {
        for (let row=0; row<grid.length; row++) {
            for (let col=0; col<grid[row].length; col++) {
                if (grid[row][col][0]) {
                    grid[row][col][0] = !grid[row][col]
                }
                grid[row][col][2] = 0
            }
        }
        return grid
    }

    const clearTerrain = () => {
        let newGrid = updateModelGridClearTerrain(modelGrid)
        setMyGrid(newGrid)
    }

    props.setClickClearTerrain(clearTerrain)

    const updateModelGridClearPath = (grid) => {
        for (let row=0; row<grid.length; row++) {
            for (let col=0; col<grid[row].length; col++) {
                if (grid[row][col][1] === true) {
                    grid[row][col][1] = false
                }
            }
        }
        return grid
    }

    const clearPath = () => {
        let newGrid = updateModelGridClearPath(modelGrid)
        setMyGrid(newGrid)
    }

    props.setClickClearPath(clearPath)

    // let start = [Math.floor(rows/2)-1,Math.floor(cols/3)-1]
    // let end = [Math.floor(rows/2)-1,Math.floor(cols*2/3)-1]
    let start = [10,15]
    let end = [10,35]

    let leftMouseIsPressed = false
    let rightMouseIsPressed = false
    let running = false
    let delay = 100
    let date = new Date()

    const toggleWall = (row,col) => {
        if ((leftMouseIsPressed) && !((row === start[0]) && (col === start[1])) &&
        !((row === end[0]) && (col === end[1]))) {
            modelGrid[row][col][0] = !modelGrid[row][col][0]
            console.log(modelGrid)
            return true
        } else {
            return false
        }
    }

    const incrementWeight = (row,col) => {
        if ((rightMouseIsPressed) && !((row === start[0]) && (col === start[1])) &&
        !((row === end[0]) && (col === end[1])) && (modelGrid[row][col][2] < 9)
        && !(modelGrid[row][col][0])) {
            modelGrid[row][col][2] += 1
            console.log(modelGrid)
            return modelGrid[row][col][2]
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

    const animate = (animation) => {
        // let frames = generateFrames(algorithm, myArray)
        let frames = [
            [[[false,false,0]]]
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
                    isWall={node[0]}
                    isExplored={node[1]}
                    weight={node[2]}
                    isStart={(row === start[0] && column === start[1])}
                    isEnd={(row === end[0] && column === end[1])}
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