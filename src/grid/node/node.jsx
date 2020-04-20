import React,{useState} from 'react'

export default function Node(props) {
    let {nodeSize,row,column,initialColor,
        handleMouseDown,handleMouseEnter,handleMouseUp} = props

    let [color,setColor] = useState(null);

    const toggleColor = () => {
        if (initialColor === "white") {
            setColor("black")
        } else if (initialColor === "black") {
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
            x={column*nodeSize}
            y={row*nodeSize}
            width={nodeSize}
            height={nodeSize}
            fill={color == null ? initialColor : color}
            stroke="black"
            strokeOpacity="0.2"
            onMouseDown={onMouseDown}
            onMouseEnter={onMouseEnter}
            onMouseUp={()=>handleMouseUp(row,column)}>
            </rect>)
}