import React from 'react'
import './Box.css'
import { useContext } from 'react'
import { Data } from '../Connect_dots'

const Box = ({box_i_index,box_j_index}) => {
    const data=useContext(Data);
    const n=data.gridSize;
    const setHoriMat=()=>{
        let copy=data.horiLineMatrix;
        copy[box_i_index+1][box_j_index]=true;
        data.setHoriLineMatrix(copy);
    }
    const setVertMat=()=>{
        let copy=data.vertLineMatrix;
        copy[box_i_index][box_j_index+1]=true;
        data.setVertLineMatrix(copy);
    }
    const fillBox=(chance,i,j)=>{
        const elem=document.getElementById(`2,${i},${j}`);
        const copy=data.boxStyle;
        if(!copy[i][j])
        {
            elem.style.backgroundColor=(chance)?'#03fc3d':'#fc0303';
            copy[i][j]=true;
            data.setBoxStyle(copy);
        }
    }
    async function updateScore(updateByScore){
        const chance=data.chance;
        if(chance){
            const prev=await data.userScore;
            const newScore=prev+updateByScore;
            await data.setUserScore(newScore);
        }
        else{
            const prev=await data.compScore;
            const newScore=prev+updateByScore;
            await data.setCompScore(newScore);
        }
    }
    const checkBoxBottomRight=()=>{
        const left_vert_line=data.vertLineMatrix[box_i_index][box_j_index];
        const top_hori_line=data.horiLineMatrix[box_i_index][box_j_index];
        const right_vert_line=data.vertLineMatrix[box_i_index][box_j_index+1];
        const bottom_hori_line=data.horiLineMatrix[box_i_index+1][box_j_index];
        const chance=data.chance;
        let bottom_right_box_filled=0;
        if(left_vert_line && top_hori_line && right_vert_line && bottom_hori_line){
            fillBox(chance,box_i_index,box_j_index);
            bottom_right_box_filled=bottom_right_box_filled+1;
        }
        return bottom_right_box_filled;
    }
    const checkBoxTop=()=>{
        const left_vert_line=data.vertLineMatrix[box_i_index+1][box_j_index];
        const top_hori_line=data.horiLineMatrix[box_i_index+1][box_j_index];
        const right_vert_line=data.vertLineMatrix[box_i_index+1][box_j_index+1];
        const bottom_hori_line=data.horiLineMatrix[box_i_index+2][box_j_index];
        const chance=data.chance;
        let top_box_filled=0;
        if(left_vert_line && top_hori_line && right_vert_line && bottom_hori_line){
            fillBox(chance,box_i_index+1,box_j_index);
            top_box_filled=top_box_filled+1;
        }
        return top_box_filled;
    }
    const checkBoxLeft=()=>{
        const left_vert_line=data.vertLineMatrix[box_i_index][box_j_index+1];
        const top_hori_line=data.horiLineMatrix[box_i_index][box_j_index+1];
        const right_vert_line=data.vertLineMatrix[box_i_index][box_j_index+2];
        const bottom_hori_line=data.horiLineMatrix[box_i_index+1][box_j_index+1];
        const chance=data.chance;
        let left_box_filled=0;
        if(left_vert_line && top_hori_line && right_vert_line && bottom_hori_line){
            fillBox(chance,box_i_index,box_j_index+1);
            left_box_filled=left_box_filled+1;
        }
        return left_box_filled;
    }
    const updateChance=(total_chance_update)=>{
        const chance=data.chance;
        const newChance=(chance+total_chance_update)%2;
        data.setChance(newChance);
        if(newChance===0){
            document.getElementById('userHourGlass').style.display='none';
            document.getElementById('compHourGlass').style.display='block';
        }
        else{
            document.getElementById('userHourGlass').style.display='block';
            document.getElementById('compHourGlass').style.display='none';
        }
    }
    const handleClickOnVertLine=(event)=>{
        const id=event.target.id;
        const arr=id.split(',');
        const i=arr[1],j=arr[2];
        if(data.vertLineMatrix[i][j])
        {
            console.log('yes');
            return;
        }
        const chance=data.chance;
        let copy=[];
        chance?
        copy.push(<div className='clickedLine' key={id} style={{color:'green'}}>{data.userName} connected dot {(i-1)*n+(j-1)+1} to dot {i*n+(j-1)+1}</div>)
        :
        copy.push(<div className='clickedLine' key={id} style={{color:'red'}}>{data.userName2} connected dot {(i-1)*n+(j-1)+1} to dot {i*n+(j-1)+1}</div>)
        setVertMat();
        event.target.style.backgroundColor="#000000";
        let total_score_update=0;
        total_score_update=total_score_update+checkBoxBottomRight();
        if(box_i_index<n && box_j_index+1<n)
        total_score_update=total_score_update+checkBoxLeft();
        if(total_score_update!==0){
            copy.pop();
            chance?
            copy.push(<div className='clickedLine' key={id} style={{color:'green'}}>{data.userName} connected dot {(i-1)*n+(j-1)+1} to dot {i*n+(j-1)+1} and scored {total_score_update} point</div>)
            :
            copy.push(<div className='clickedLine' key={id} style={{color:'red'}}>{data.userName2} connected dot {(i-1)*n+(j-1)+1} to dot {i*n+(j-1)+1} and scored {total_score_update} point</div>)
        }
        updateScore(total_score_update);
        updateChance(total_score_update?2:1);
        (data.descr).map(elem=>(
            copy.push(elem)
        ))
        data.setDescr(copy);
    }
    const handleClickOnHoriLine=(event)=>{
        const id=event.target.id;
        const arr=id.split(',');
        const i=+arr[1],j=+arr[2];
        if(data.horiLineMatrix[i][j])
        {
            console.log('yes');
            return;
        }
        let copy=[];
        const chance=data.chance;
        chance?
        copy.push(<div className='clickedLine' key={id} style={{color:'green'}}>{data.userName} connected dot {(i-1)*n+(j-1)+1} to dot {(i-1)*n+j+1}</div>)
        :
        copy.push(<div className='clickedLine' key={id} style={{color:'red'}}>{data.userName2} connected dot {(i-1)*n+(j-1)+1} to dot {(i-1)*n+j+1}</div>)
        setHoriMat();
        event.target.style.backgroundColor="#000000";
        let total_score_update=0;
        total_score_update=total_score_update+checkBoxBottomRight();
        if(box_i_index+1<n && box_j_index<n)
        total_score_update=total_score_update+checkBoxTop();
        if(total_score_update!==0){
            copy.pop();
            chance?
            copy.push(<div className='clickedLine' key={id} style={{color:'green'}}>{data.userName} connected dot {(i-1)*n+(j-1)+1} to dot {(i-1)*n+j+1} and scored {total_score_update} point</div>)
            :
            copy.push(<div className='clickedLine' key={id} style={{color:'red'}}>{data.userName2} connected dot {(i-1)*n+(j-1)+1} to dot {(i-1)*n+j+1} and scored {total_score_update} point</div>)
        }
        updateScore(total_score_update);
        updateChance(total_score_update?2:1);
        (data.descr).map(elem=>(
            copy.push(elem)
        ))
        data.setDescr(copy);
    }
    return (
        <div className='cont' >
            <div className='part1'>
                {
                    box_i_index>0 && box_j_index>0?
                    <div className='box'  id={`2,${box_i_index},${box_j_index}`}></div>
                    :
                    <></>
                }
                {
                    box_i_index>0?
                    <div className="incWidth">
                        <div className='vertical_line'  id={`1,${box_i_index},${box_j_index+1}`} onClick={handleClickOnVertLine}></div>
                    </div>
                    :
                    <></>
                }
            </div>
            <div className='part2'>
                {
                    box_j_index>0?
                    <div className="incHeight">
                        <div className='horizontal_line'  id={`0,${box_i_index+1},${box_j_index}`} onClick={handleClickOnHoriLine}></div>
                    </div>
                    :
                    <></>
                }
                <div className='dot'>{box_i_index*(n)+box_j_index+1}</div>
            </div>
        </div>
  )
}

export default Box


// const findOptimal_that_fills_one_box=()=>{
//     const currBoxStatus=data.boxStyle;
//     const currHoriLineStatus=data.horiLineMatrix;
//     const currVerLineStatus=data.vertLineMatrix;
//     let i,j,l,r,t,b,flag,maxLines;
//     let fillOneBox=[],fillTwoBox=[],makesThreeLines=[],makesTwoLines=[],makesOneLine=[];
//     // finding optimal horizontal line
//     for(i=1;i<=n;i++){
//         for(j=1;j<n;j++){
//             if(!currHoriLineStatus[i][j]){
//                 flag=maxLines=0;
//                 if(i-1>0){
//                     // lines for top box 
//                     l=currVerLineStatus[i-1][j];
//                     t=currHoriLineStatus[i-1][j];
//                     r=currVerLineStatus[i-1][j+1];
//                     maxLines=Math.max(maxLines,(l+t+r));
//                     if(l && t && r)
//                     flag=flag+1;
//                 }
//                 if(i+1<=n){
//                     // lines for bottom box 
//                     l=currVerLineStatus[i][j];
//                     b=currHoriLineStatus[i+1][j];
//                     r=currVerLineStatus[i][j+1];
//                     maxLines=Math.max(maxLines,(l+b+r));
//                     if(l && b && r)
//                     flag=flag+1;
//                 }
//                 if(flag==2)
//                 fillTwoBox.push(`0,${i},${j}`);
//             }
//         }
//     }
// }