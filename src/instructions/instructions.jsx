import React from 'react'
import './instructions.css'

export default function Instructions(props) {
    return(
        <div id="instructionsContainer">
            <div class="header">
                <p className="headerItems">Instructions</p>
                <p className="headerItems" id="closeInstructions" onClick={() =>
                document.getElementById("instructionsContainer").className
                = "hidden"}>x</p>
            </div>
            <div id="bodyContainer">
                <p id="body">
                Click and drag with the left mouse button to create walls<br></br>
                Click with the right mouse button to increase a node's weight<br></br>
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

