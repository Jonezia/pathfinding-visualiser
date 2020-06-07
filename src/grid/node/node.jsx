import React from 'react'

const wallColor = "rgba(85,85,85,1)"
const exploredColor = "rgb(206,250,5)"
const pathColor = "rgb(255,190,28)"
const startColor = "rgba(255,60,60,1)"
const endColor = "rgba(180,65,255,1)"
const weights = ["rgba(255,255,255,1)", "rgba(204,250,255,1)",
    "rgba(178,242,255,1)", "rgba(153,229,255,1)", "rgba(127,212,255,1)",
    "rgba(101,191,255,1)", "rgba(76,165,255,1)", "rgba(50,136,255,1)",
    "rgba(25,101,240,1)", "rgba(0,63,200,1)"]

export default function Node(props) {
    let {nodeSize,row,column,id,isWall,isPath,isExplored,weight,isStart,isEnd,
        handleLeftMouseDown,handleLeftMouseEnter,handleLeftMouseUp,
        handleRightMouseDown,handleRightMouseEnter,handleRightMouseUp,} = props

    const setInitialColor = () => {
        if (isStart) {return startColor}
        else if (isEnd) {return endColor}
        else if (isWall) {return wallColor}
        else if (isPath) {return pathColor}
        else if (isExplored) {return exploredColor}
        return weights[weight]
    }

    let initialColor = setInitialColor()
    const setColor = (newcolor) => {
        color = newcolor
        document.getElementById(`${row}-${column}`).style.fill = newcolor
    }

    let color = initialColor

    const toggleColor = () => {
        if (color !== wallColor) {
            setColor(wallColor)
        } else if (color === wallColor) {
            setColor(initialColor)
        }
    }

    const incrementWeightColor = (newWeight) => {
        initialColor = weights[newWeight]
        setColor(initialColor)
    }

    const onMouseDown = (e) => {
        switch (e.button) {
            case 0: if (handleLeftMouseDown(row,column)) {toggleColor()}; break;
            case 2: let newWeight = handleRightMouseDown(row,column)
                    if (newWeight) {incrementWeightColor(newWeight)}; break;
            default: if (handleLeftMouseDown(row,column)) {toggleColor()};
        }
    }

    const onMouseEnter = (e) => {
        if (handleLeftMouseEnter(row,column)) {toggleColor()};
        let newWeight = handleRightMouseEnter(row,column);
        if (newWeight) {incrementWeightColor(newWeight)};
    }

    const onMouseUp = (e) => {
        switch (e.button) {
            case 0: handleLeftMouseUp(row,column); break;
            case 2: handleRightMouseUp(row,column); break;
            default: handleLeftMouseUp(row,column);;
        }
    }

    return(
        <rect className="node"
            id={id}
            x={column*nodeSize}
            y={row*nodeSize}
            width={nodeSize}
            height={nodeSize}
            fill={color}
            stroke="black"
            strokeOpacity="0.1"
            onMouseDown={onMouseDown}
            onMouseEnter={onMouseEnter}
            onMouseUp={onMouseUp}
            onContextMenu={(e) => e.preventDefault()}>
            </rect>)
}