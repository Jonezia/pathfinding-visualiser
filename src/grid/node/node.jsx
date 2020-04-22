import React,{useState} from 'react'

export default function Node(props) {
    let {nodeSize,row,column,state,weight,isStart,isEnd,
        handleMouseDown,handleMouseEnter,handleMouseUp} = props

    const wallColor = "black"
    const exploredColor = "green"
    const fringeColor = "light green"
    const startColor = "red"
    const endColor = "purple"
    const weights = ["rgba(255,255,255,1)", "rgba(204,250,255,1)",
    "rgba(178,242,255,1)", "rgba(153,229,255,1)", "rgba(127,212,255,1)",
    "rgba(101,191,255,1)", "rgba(76,165,255,1)", "rgba(50,136,255,1)",
    "rgba(25,101,240,1)", "rgba(0,63,200,1)"]

    const setInitialColor = () => {
        if (isStart) {return startColor}
        else if (isEnd) {return endColor}
        switch(state) {
            case 0: return weights[weight];
            case 1: return wallColor;
            case 2: return exploredColor;
            case 3: return fringeColor;
            default: return weights[0];
        }
    }

    let prevColor = weights[0]

    let [color,setColor] = useState(setInitialColor);

    const toggleColor = () => {
        if (color !== wallColor) {
            prevColor = color
            setColor(wallColor)
        } else if (color === wallColor) {
            setColor(prevColor)
        }
    }

    const onMouseDown = () => {
        if (handleMouseDown(row,column)) {toggleColor()}
    }

    const onMouseEnter = () => {
        if (handleMouseEnter(row,column)) {toggleColor()}
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
            onMouseUp={()=>handleMouseUp(row,column)}>
            </rect>)
}