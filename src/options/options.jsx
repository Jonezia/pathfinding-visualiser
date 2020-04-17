import React from 'react';
import './options.css';

export default function Options(props) {
    let toggleOptions = () => {
        console.log('yeet')
        let options = document.getElementById("optionsContainer")
        let widget = document.getElementById("headerWidget")
        if (options.className === "maximised") {
            options.className = "minimised"
            widget.innerHTML = "+"
        } else {
            options.className = "maximised"
            widget.innerHTML = "-"
        }
    }

    return(
        <div id="optionsContainer" className="maximised">
            <div id="header">
                <p className="headerItems">Settings</p>
                <p className="headerItems" id="headerWidget"
                onClick={toggleOptions}>-</p>
            </div>
            <div id="tabsContainer">
                <span className="tabs" id="leftTab">
                    <p className="tabsContent">Algorithms</p></span>
                <span className="tabs" id="middleTab">
                    <p className="tabsContent">Terrain</p></span>
                <span className="tabs" id="rightTab">
                    <p className="tabsContent">Nodes</p></span>
            </div>
            <div id="contentContainer">
                
            </div>
        </div>
    )
}