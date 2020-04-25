import React,{useState} from 'react'
import './stats.css'

export default function Stats(props) {
    let [time,setTime] = useState()
    let [length,setLength] = useState()
    let [steps,setSteps] = useState()
    let [work,useWork] = useState()

    return(
        <div id="statsContainer">
            <p id="statsContent">Time: {time}<br></br>
            Length: {length}<br></br>
            Steps: {steps}<br></br>
            Work: {work}</p>
        </div>
    )
}