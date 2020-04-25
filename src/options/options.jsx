import React,{useState} from 'react';
import './options.css';
import OptionsContent from './optionsContent/optionsContent'

export default function Options(props) {
    let [selectedTab,setSelectedTab] = useState("algorithm")

    let toggleOptions = () => {
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

    let changeDisplayedOptions = (tab) => {
        let prevTab = document.getElementById(`${selectedTab}Tab`)
        let newTab = document.getElementById(`${tab}Tab`)
        prevTab.className = "tab"
        newTab.className = "selectedTab"
        setSelectedTab(tab)
    }

    return(
        <div id="optionsContainer" className="maximised">
            <div class="header">
                <p className="headerItems">Settings</p>
                <p className="headerItems" id="headerWidget"
                onClick={toggleOptions}>-</p>
            </div>
            <div id="tabsContainer">
                <span className="selectedTab" id="algorithmTab"
                onClick={()=>changeDisplayedOptions("algorithm")}>
                    <p className="tabsContent">Algorithm</p></span>
                <span className="tab" id="terrainTab"
                onClick={()=>changeDisplayedOptions("terrain")}>
                    <p className="tabsContent">Terrain</p></span>
                <span className="tab" id="nodesTab"
                onClick={()=>changeDisplayedOptions("nodes")}>
                    <p className="tabsContent">Nodes</p></span>
            </div>
            <div id="contentContainer">
                <OptionsContent selectedTab={selectedTab}/>
            </div>
        </div>
    )
}