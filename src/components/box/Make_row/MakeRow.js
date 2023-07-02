import React from 'react'
import './Make_row.css'
import Box from '../Box';

const MakeRow = ({gridSize,row_id}) => {
    const boxes=[];
    const func=()=>{
        let n=gridSize;
        let k=0;
        while(k<n){
            boxes.push(<Box box_i_index={row_id} box_j_index={k} key={`${row_id},${k}`}/>)
            k++;
        }
    }
    func();
    return (
        <div className='make_flex'>
            {boxes}
        </div>
    )
}

export default MakeRow
