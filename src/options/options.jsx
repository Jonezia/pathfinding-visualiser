import React from 'react';
import './options.css';

export default function Options(props) {
    return(
        <div id="optionsContainer">
            <div id="header">
                <p id="headerText" className="headerItems">Settings</p>
                <p id="headerWidget" className="headerItems">-</p>
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