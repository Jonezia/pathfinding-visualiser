import React,{useRef,useState,useLayoutEffect} from 'react';
import Bar from './bar/bar';
import Grid from './grid/grid';
import Options from './options/options';
import Instructions from './instructions/instructions'
import Stats from './stats/stats'

export default function App(props) {
    const targetRef = useRef()
    const [dimensions,setDimensions] = useState({width:0,height:0});
    const [nodeSize,setNodeSize] = useState(30)

    let algorithm
    let terrain
    const changeAlgorithm = (event) => {
        algorithm = event.target.value
    }
    const changeTerrain = (event) => {
        terrain = event.target.value
    }

    useLayoutEffect(() => {
        if (targetRef.current) {
          setDimensions({
            width: targetRef.current.offsetWidth,
            height: targetRef.current.offsetHeight
          });
        }
      }, []);

    return(
        <div ref={targetRef}>
            <Bar onChangeAlgorithm={changeAlgorithm}
            onChangeTerrain={changeTerrain}/>
            <Grid node_size={nodeSize} width={dimensions.width}
            height={dimensions.height - 60}/>
            <Options/>
            <Instructions/>
            <Stats/>
        </div>
    )
}