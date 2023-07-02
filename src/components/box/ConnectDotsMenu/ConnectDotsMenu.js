import React, { useState } from 'react'
import './ConnectDotsMenu.css'
import { Link } from 'react-router-dom';

const ConnectDotsMenu = () => {
  const [name1,setName1]=useState('');
  const [name2,setName2]=useState('');
  const [diff,setDiff]=useState(6);
  return (
    <div className='pge'>
      <div className="frm">
        <div className="pl1">
          <div className="inp1">
            Player 1 Name:
          </div>
          <input 
            className='inpt'
            type="text" 
            value={name1}
            onChange={(e)=>setName1(e.target.value)}
          />
        </div>
        <div className="pl2">
          <div className="inp1">
            Player 2 Name:
          </div>
          <input 
            className='inpt'
            type="text" 
            value={name2}
            onChange={(e)=>setName2(e.target.value)}
          />
        </div>
        <div className="difficulty">
          <div className="inp1">
            Difficulty:
          </div>
          <select value={diff} onChange={(e)=>setDiff(e.target.value)}>
            <option value="6">Beginner (5X5 matrix)</option>
            <option value="8" selected>Intermediate (7X7 matrix)</option>
            <option value="10">Hard (9X9 matrix)</option>
          </select>
        </div>
        <div className="sbmt">
          <Link style={{textDecoration:'none'}} to={'/Game'} state={{name1,name2,diff}}>
            <div className="strtBtn">Start</div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ConnectDotsMenu
