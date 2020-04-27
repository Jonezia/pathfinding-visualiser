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
            onClickClearPath={onClickClearPath}/>
            <Grid width={dimensions.width}
            height={dimensions.height - 60}
            setClickClearTerrain={setClickClearTerrain}
            setClickClearPath={setClickClearPath}
            setChangeNodeSize={setChangeNodeSize}
            algorithm={algorithm}
            speed={speed}/>
            <Options onChangeSpeed={changeSpeed}
            onChangeNodeSize={onChangeNodeSize}
            speed={speed}/>
            <Instructions/>
            <Stats/>
        </div>
    )
}