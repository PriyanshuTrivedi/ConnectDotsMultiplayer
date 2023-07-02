import React, { useContext, useEffect} from 'react'
import { Data } from '../../Connect_dots'
import hourglass from '../../images/hourglass.gif'
import './ScoreBoard.css'

const ScoreBoard = () => {
    const data=useContext(Data);
    const info=data.descr;
    useEffect(() => {
        document.getElementById('txtAreaid').scrollTop='300px'
    }, [info]);
    return (
        <>
            <div className='scoreBoard'>
                <div className="scoreDisplay">
                    <div className="userBoard">
                        <div className="denoteColor">
                            <div className="userStyleColor"></div>
                        </div>
                        <div className="name">{data.userName}</div>
                        <div className="userScore">{data.userScore}</div>
                        <div id="userHourGlass">
                            <img src={hourglass} alt="tic-tock" className='myImg'/>
                        </div>
                    </div>
                    <div className="compBoard">
                        <div className="denoteColor">
                            <div className="compStyleColor"></div>
                        </div>
                        <div className="name">{data.userName2}</div>
                        <div className="compScore">{data.compScore}</div>
                        <div id="compHourGlass">
                            <img src={hourglass} alt="tic-tock" className='myImg'/>
                        </div>
                    </div>
                </div>
                <div className="desc">
                    <h3>Game Information</h3>
                    <div className="txtArea" id='txtAreaid'>
                    {
                        info.map((element,index)=>(
                            <div className="txt" key={index}>{element}</div>
                        ))
                    }
                    </div>
                </div>
            </div>
        </>
    )
}

export default ScoreBoard;
