import React from 'react'

export default function node(props) {
    return(
        <rect x={props.row*props.node_size} y={props.column*props.node_size}
            width={props.node_size} height={props.node_size}
            fill="white" stroke="black"
            stroke-opacity="0.2"></rect>)
}