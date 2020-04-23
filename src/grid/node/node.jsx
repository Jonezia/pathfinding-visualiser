import React,{useState} from 'react'

export default function Node(props) {
    let {nodeSize,row,column,isWall,isExplored,weight,isStart,isEnd,
        handleLeftMouseDown,handleLeftMouseEnter,handleLeftMouseUp,
        handleRightMouseDown,handleRightMouseEnter,handleRightMouseUp,} = props

    const wallColor = "black"
    const exploredColor = "green"
    const startColor = "red"
    const endColor = "purple"
    const weights = ["rgba(255,255,255,1)", "rgba(204,250,255,1)",
    "rgba(178,242,255,1)", "rgba(153,229,255,1)", "rgba(127,212,255,1)",
    "rgba(101,191,255,1)", "rgba(76,165,255,1)", "rgba(50,136,255,1)",
    "rgba(25,101,240,1)", "rgba(0,63,200,1)"]

    const setInitialColor = () => {
        if (isStart) {return startColor}
        else if (isEnd) {return endColor}
        else if (isWall) {return wallColor}
        else if (isExplored) {return exploredColor}
        return weights[weight]
    }

    let initialColor = setInitialColor()

    let [color,setColor] = useState(initialColor);

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
            x={column*nodeSize}
            y={row*nodeSize}
            width={nodeSize}
            height={nodeSize}
            fill={color}
            stroke="black"
            strokeOpacity="0.2"
            onMouseDown={onMouseDown}
            onMouseEnter={onMouseEnter}
            onMouseUp={onMouseUp}
            onContextMenu={(e) => e.preventDefault()}>
            </rect>)
}