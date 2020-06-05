import React,{useState} from 'react';
import './optionsContent.css';

export default function OptionsContent(props) {
    let [speed,setSpeed] = useState(50)
    let [nodeSize,setNodeSize] = useState(30)

    let changeSpeed = (event) => {
        setSpeed(event.target.value)
        props.onChangeSpeed(event)
    }
    let changeNodeSize = (event) => {
        setNodeSize(event.target.value)
        props.onChangeNodeSize(event)
    }

    if (props.selectedTab === "algorithm") {
        return (
            <div className="contentWrapper">
                <div className="selectorWrapper">
                    <p>Speed:</p>
                    <input name="speed" type="range" min="1"
                    max="100" className="slider" id="speedSelector"
                    value={speed}
                    onChange={changeSpeed}></input>
                </div>
                <div className="selectorWrapper">
                    <p>Heuristic: </p>
                    <div onChange={props.onChangeHeuristic}>
                        <div className="selector">
                            <input type="radio" value="euclidean"
                            name="heuristic" defaultChecked/>
                            <label>Euclidean</label>
                        </div>
                        <div className="selector">
                            <input type="radio" value="manhattan"
                            name="heuristic"/>
                            <label>Manhattan</label>
                        </div>
                    </div>
                </div>
                <div className="selectorWrapper">
                    <p>Heuristic strength: </p>
                    <div>
                        <div className="selector">
                            <input className="textInput" placeholder="1"
                            onChange={props.onChangeHeuristicStrength}/>
                        </div>
                    </div>
                </div>
                <div className="selectorWrapper">
                    <p>Options: </p>
                    <div>
                        <div className="selector">
                            <input type="checkbox" value="diagonal"
                            onChange={props.onChangeDiagonal}/>
                            <label>Allow diagonal</label>
                        </div>
                        <div className="selector">
                            <input type="checkbox" value="corners"
                            defaultChecked onChange={props.onChangeCorners}/>
                            <label>Cross corners</label>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else if (props.selectedTab === "terrain") {
        return(
            <div className="contentWrapper">
                <div className="selectorWrapper">
                    <p>Terrain Settings: WIP</p>
                </div>
            </div>
        )
    } else {
        return(
            <div className="contentWrapper">
                <div className="selectorWrapper">
                    <p>Node size:</p>
                    <input name="nodeSize" type="range" id="nodeSizeSelector"
                    className="slider" min="10" max="100"
                    value={nodeSize}
                    onChange={changeNodeSize}></input>
                </div>
            </div>
        )
    }
}