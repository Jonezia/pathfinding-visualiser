import React from 'react'
import './bar.css'

export default function Bar(props) {
    return(
        <div className="bar">
            <p id="title">Pathfinding Visualiser</p>
            <select onChange={props.onChangeAlgorithm}>
                <option value="DEFAULT" hidden>Algorithm</option>
                <option value="bfs">Breadth-First Search</option>
                <option value="dfs">Depth-First Search</option>
                <option value="greedy">Greedy Best-First Search</option>
                <option value="dijkstra">Dijkstra's Algorithm</option>
                <option value="astar">A* Search</option>
            </select>
            <select onChange={props.onChangeTerrain}>
                <option value="DEFAULT" hidden>Terrain</option>
                <option value="none">None</option>
                <option value="maze">Recursive Maze</option>
                <option value="landscape">Weighted Landscape</option>
            </select>
            <button id="run" onClick={() => props.onClickGetFrames()}>Run!</button>
            <button  onClick={() => props.onClickClearPath()}>Clear Path</button>
            <button id="finalButton"
            onClick={() => props.onClickClearTerrain()}>Clear Terrain</button>
        </div>
    )
}