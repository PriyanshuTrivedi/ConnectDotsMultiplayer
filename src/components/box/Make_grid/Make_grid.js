import React from 'react';
import './Make_grid.css'
import MakeRow from '../Make_row/MakeRow';
import { useContext } from 'react'
import { Data } from '../../Connect_dots';

const Make_grid = () => {
    const data=useContext(Data);
    const rows=[];
    const initialTopLines=[];
    const func=()=>{
        let k=0;
        const n=data.gridSize;
        while(k<n){
            rows.push(
                <div className="final_row" key={`${k}dot,vertLine,Row`}>
                    <MakeRow row_id={k} gridSize={n}/>
                </div>
            )
            k++;
        }
    }
    func();
    return (
        <div>
            <div className="make_flex">
                {initialTopLines}
            </div>
            {rows}
        </div>
    )
}

export default Make_grid

