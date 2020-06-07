import React,{useRef,useState,useLayoutEffect} from 'react';
import './App.css'
import Bar from './bar/bar';
import Grid from './grid/grid';
import Options from './options/options';
import Instructions from './instructions/instructions'
import Stats from './stats/stats'

export default function App(props) {
    const targetRef = useRef()
    const [dimensions,setDimensions] = useState({width:0,height:0});

    let [algorithm,setAlgorithm] = useState(null)
    let [terrain,setTerrain] = useState(null)
    let [speed,setSpeed] = useState(50)
    let [heuristic,setHeuristic] = useState("euclidean")
    let [heuristicStrength,setHeuristicStrength] = useState(1)
    let [diagonal,setDiagonal] = useState(false)
    let [corners,setCorners] = useState(true)

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
        setAlgorithm(event.target.value)
    }
    const changeTerrain = (event) => {
        setTerrain(event.target.value)
    }
    const changeSpeed = (event) => {
        setSpeed(event.target.value)
    }
    const changeHeuristic = (event) => {
        setHeuristic(event.target.value)
    }
    const changeHeuristicStrength = (event) => {
        if (event.target.value) {
            setHeuristicStrength(event.target.value)
        }
        else {
            setHeuristicStrength(1)
        }
    }
    const changeDiagonal = (event) => {
        setDiagonal(event.target.checked)
    }
    const changeCorners = (event) => {
        setCorners(event.target.checked)
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
            terrain={terrain}
            heuristic={heuristic}
            heuristicStrength={heuristicStrength}
            diagonal={diagonal}
            corners={corners}/>
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