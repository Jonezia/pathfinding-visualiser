import React,{useRef,useState,useLayoutEffect} from 'react';
import './App.css'
import Bar from './bar/bar';
import Grid from './grid/grid';
import Options from './options/options';
import Instructions from './instructions/instructions'
import Stats from './stats/stats'

let algorithm
let terrain
let speed = 50
let heuristic = "euclidean"
let heuristicStrength = 1
let diagonal = false
let corners = true

export default function App(props) {
    const targetRef = useRef()
    const [dimensions,setDimensions] = useState({width:0,height:0});

    let onClickClearTerrainPassUp
    const onClickClearTerrain = () => {
        onClickClearTerrainPassUp()
    }
    const setClickClearTerrain = (func) => {
        onClickClearTerrainPassUp = func
    }

    let onClickClearPathPassUp
    const onClickClearPath = () => {
        onClickClearPathPassUp()
    }
    const setClickClearPath = (func) => {
        onClickClearPathPassUp = func
    }

    let onClickGetFramesPassUp
    const onClickGetFrames = () => {
        onClickGetFramesPassUp()
    }
    const setClickGetFrames = (func) => {
        onClickGetFramesPassUp = func
    }

    let onChangeNodeSizePassUp
    const onChangeNodeSize = (event) => {
        onChangeNodeSizePassUp(event.target.value)
    }
    const setChangeNodeSize = (func) => {
        onChangeNodeSizePassUp = func
    }


    const changeAlgorithm = (event) => {
        algorithm = event.target.value
    }
    const changeTerrain = (event) => {
        terrain = event.target.value
    }
    const changeSpeed = (event) => {
        speed = event.target.value
    }
    const changeHeuristic = (event) => {
        heuristic = event.target.value
    }
    const changeHeuristicStrength = (event) => {
        if (event.target.value) {
            heuristicStrength = event.target.value
        }
        else {
            heuristicStrength = 1
        }
    }
    const changeDiagonal = (event) => {
        diagonal = event.target.checked
    }
    const changeCorners = (event) => {
        corners = event.target.checked
    }

    useLayoutEffect(() => {
        if (targetRef.current) {
          setDimensions({
            width: targetRef.current.offsetWidth,
            height: targetRef.current.offsetHeight
          })
        }
      }, []);

    return(
        <div ref={targetRef} id="masterContainer">
            <Bar onChangeAlgorithm={changeAlgorithm}
            onChangeTerrain={changeTerrain}
            onClickClearTerrain={onClickClearTerrain}
            onClickClearPath={onClickClearPath}
            onClickGetFrames={onClickGetFrames}/>
            <Grid width={dimensions.width}
            height={dimensions.height - 60}
            setClickClearTerrain={setClickClearTerrain}
            setClickClearPath={setClickClearPath}
            setClickGetFrames={setClickGetFrames}
            setChangeNodeSize={setChangeNodeSize}
            algorithm={algorithm}
            speed={speed}
            heuristic={heuristic}/>
            <Options onChangeSpeed={changeSpeed}
            onChangeNodeSize={onChangeNodeSize}
            onChangeHeuristic={changeHeuristic}
            onChangeHeuristicStrength={changeHeuristicStrength}
            onChangeDiagonal={changeDiagonal}
            onChangeCorners={changeCorners}/>
            <Instructions/>
            <Stats/>
        </div>
    )
}