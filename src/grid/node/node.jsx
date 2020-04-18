import React,{useState} from 'react'

export default function Node(props) {
    let {node_size,row,column,isStart,isEnd,
        handleMouseDown,handleMouseEnter,handleMouseUp} = props

    let defaultColor = "white"
    if (isStart) {
        defaultColor = "red"
    } else if (isEnd) {
        defaultColor = "purple"
    }

    let [color,setColor] = useState(defaultColor);

    const toggleColor = () => {
        if (color === "white") {
            setColor("black")
        } else if (color === "black") {
            setColor("white")
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
            x={column*node_size}
            y={row*node_size}
            width={node_size}
            height={node_size}
            fill={color}
            stroke="black"
            strokeOpacity="0.2"
            onMouseDown={onMouseDown}
            onMouseEnter={onMouseEnter}
            onMouseUp={()=>handleMouseUp(row,column)}>
            </rect>)
}