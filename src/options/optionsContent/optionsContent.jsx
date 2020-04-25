import React from 'react';
import './optionsContent.css';

export default function OptionsContent(props) {
    let {selectedTab} = props

    if (selectedTab === "algorithm") {
        return (
            <div id="contentWrapper">
                <div className="selectorWrapper">
                    <p>Speed:</p>
                    <input name="speed" type="range" min="1"
                    max="100" className="slider"></input>
                </div>
                <div className="selectorWrapper">
                    <p>Heuristic: </p>
                    <div>
                        <div class="radioSelector">
                            <input type="radio" value="euclidean"/>
                            <label>Euclidean</label>
                        </div>
                        <div class="radioSelector">
                            <input type="radio" value="manhattan"/>
                            <label>Manhattan</label>
                        </div>
                    </div>
                </div>
                <div className="selectorWrapper">
                    <p>Options: </p>
                    <div>
                        <div class="checkboxSelector">
                            <input type="checkbox" value="diagonal"/>
                            <label>Allow diagonal</label>
                        </div>
                        <div class="checkboxSelector">
                            <input type="checkbox" value="corners"/>
                            <label>Cross corners</label>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else if (selectedTab === "terrain") {
        return(
            <div id="contentWrapper">
                <div className="selectorWrapper">
                    <p>Terrain Settings: WIP</p>
                </div>
            </div>
        )
    } else {
        return(
            <div id="contentWrapper">
                <div className="selectorWrapper">
                    <p>Node size:</p>
                    <input name="nodeSize" className="textInput"></input>
                </div>
            </div>
        )
    }
}