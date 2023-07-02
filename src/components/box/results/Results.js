import React, { useContext } from 'react'
import { Data } from '../../Connect_dots'
import './Results.css'
import { Link } from 'react-router-dom';

const Results = () => {
    const data=useContext(Data);
    const userName=data.userName;
    const userName2=data.userName2;
    const user1Score=data.userScore,user2Score=data.compScore;
    const diff=Math.abs(user1Score-user2Score);
    const winner=user1Score>user2Score?userName:userName2;
    return (
        <div className="resBox">
            <div className="mainRes">
                {winner} wins by a score difference of {diff}.
            </div>
            <div className="btn">
                <div className="restart mrgn" onClick={data.resetAll}>Restart</div>
                <Link style={{textDecoration:'none'}} to={'/'}><div className="mainMenu mrgn">Main Menu</div></Link>
            </div>
        </div>
    )
}

export default Results
