import React from 'react'
import './instructions.css'

export default function Instructions(props) {
    return(
        <div id="instructionsContainer">
            <div id="header">
                <p className="headerItems">Instructions</p>
                <p className="headerItems">x</p>
            </div>
            <div id="bodyContainer">
                <p id="body">
                Click and drag on the grid to create walls<br></br>
                Drag the <span className="red">red </span>
                node to change the start position<br></br>
                Drag the <span className="purple">purple </span>
                node to change the end position<br></br>
                Select an algorithm using the drop-down menu above<br></br>
                Press "Run" above to start the search</p>
            </div>
        </div>
    )
}