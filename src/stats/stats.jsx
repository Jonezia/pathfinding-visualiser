import React,{useState} from 'react'
import './stats.css'

export default function Stats(props) {

    return(
        <div id="statsContainer">
            <p id="statsVisited">Visited: </p>
            <p id="statsSteps">Steps: </p>
            <p id="statsWork">Work: </p>
        </div>
    )
}