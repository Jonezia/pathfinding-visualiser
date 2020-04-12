import React,{useState} from 'react'

export default function Node(props) {
    let [color,setColor] = useState("white");

    const newWall = () => {
        color === "white" ? setColor("black") : setColor("white")
    }

    return(
        <rect className="node"
            x={props.row*props.node_size}
            y={props.column*props.node_size}
            width={props.node_size}
            height={props.node_size}
            fill={color}
            stroke="black"
            strokeOpacity="0.2"
            onClick={newWall}>
            </rect>)
}