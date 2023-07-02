import { createContext,useState } from 'react'
import './Connect_dots.css'
import Make_grid from './box/Make_grid/Make_grid';
import ScoreBoard from './box/ScoreBoard/ScoreBoard';
import Results from './box/results/Results';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Data=createContext();

const Connect_dots = () => {
    const loc=useLocation();
    const name1=loc.state.name1;
    const name2=loc.state.name2;
    const diff=loc.state.diff;
    const [gridSize,setGridSize]=useState(diff);
    const [boxStyle,setBoxStyle]=useState(Array.from({length: gridSize+1},()=> Array.from({length: gridSize}, () => "")));
    const [userScore,setUserScore]=useState(0);
    const [compScore,setCompScore]=useState(0);
    const [userName,setUserName]=useState(name1);
    const [userName2,setUserName2]=useState(name2);
    const [chance,setChance]=useState(0);
    const [horiLineMatrix,setHoriLineMatrix]=useState(Array.from({length: gridSize+1},()=> Array.from({length: gridSize}, () => false)));
    const [vertLineMatrix,setVertLineMatrix]=useState(Array.from({length: gridSize},()=> Array.from({length: gridSize+1}, () => false)));
    const [boxMatrix,setBoxMatrix]=useState(Array.from({length: gridSize},()=> Array.from({length: gridSize}, () => false)));
    const [descr,setDescr]=useState([]);
    const resetAll=()=>{
        setBoxStyle(Array.from({length: gridSize+1},()=> Array.from({length: gridSize}, () => "")));
        setUserScore(0);
        setCompScore(0);
        setChance(0);
        setHoriLineMatrix(Array.from({length: gridSize+1},()=> Array.from({length: gridSize}, () => false)));
        setVertLineMatrix(Array.from({length: gridSize},()=> Array.from({length: gridSize+1}, () => false)));
        setBoxMatrix(Array.from({length: gridSize},()=> Array.from({length: gridSize}, () => false)));
        setDescr([]);
        document.getElementById('userHourGlass').style.display='none';
        document.getElementById('compHourGlass').style.display='block';
        let i,j;
        for(i=1;i<=gridSize;i++){
            for(j=1;j<gridSize;j++){
                document.getElementById(`0,${i},${j}`).style.backgroundColor='#bfd7da';
            }
        }
        for(i=1;i<gridSize;i++){
            for(j=1;j<=gridSize;j++){
                document.getElementById(`1,${i},${j}`).style.backgroundColor='#bfd7da';
            }
        }
        for(i=1;i<gridSize;i++){
            for(j=1;j<gridSize;j++){
                document.getElementById(`2,${i},${j}`).style.backgroundColor='#bebba9';
            }
        }
    }
    return (
        <div className="connectDotsGame">
            <Data.Provider value={{horiLineMatrix,setHoriLineMatrix,vertLineMatrix,setVertLineMatrix,boxMatrix,setBoxMatrix,gridSize,userScore,setUserScore,compScore,setCompScore,chance,setChance,boxStyle,setBoxStyle,userName,setUserName,userName2,setUserName2,descr,setDescr,resetAll}}>
                <div className="mainGame">
                    <div className="mainGrid">
                        <Make_grid/>
                    </div>
                    <div className="cont1">
                        <div className="btns">
                            <div className="restrt stylebtns" onClick={resetAll}>Restart</div>
                            <Link style={{textDecoration:'none'}} to={'/'}><div className="quitMainMenu stylebtns">Quit to main menu</div></Link>
                        </div>
                        <div className="gameInfo">
                            <ScoreBoard/>
                        </div>
                    </div>
                    <div style={userScore+compScore===(gridSize-1)*(gridSize-1)?{visibility:'visible'}:{visibility:'hidden'}} className="res">
                        <Results/>
                    </div>
                </div>
            </Data.Provider>
        </div>
    )
}
export default Connect_dots
export {Data}
