import React,{useRef,useState,useLayoutEffect} from 'react';
import Bar from './bar/bar';
import Grid from './grid/grid';

let node_size = 30

export default function App(props) {
    const targetRef = useRef()
    const [dimensions,setDimensions] = useState({width:0,height:0});

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
            <Grid node_size={node_size} width={dimensions.width}
            height={dimensions.height - 60}/>
        </div>
    )
}