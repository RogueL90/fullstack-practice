import { useState } from 'react'

const History = (props) => {
  if(props.array.length===0){
    return (
      <p> Empty history! </p>
    )
  }
    return (
      <p>{props.array.join()}</p>
    )
}

const Button = ({text, onClick}) => <button onClick = {onClick}>{text}</button>; 

const App = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [history, setHistory] = useState([]);
  const [total, setTotal] = useState(0);
  const handleLeftClick = () =>{
    setHistory(history.concat('L'));
    const leftNew = left+1;
    setLeft(left+1);
    setTotal(leftNew+right);
  }
  const handleRightClick = () =>{
    setHistory(history.concat('R'));
    const rightNew = right+1;
    setRight(right+1);
    setTotal(left+rightNew);
  }
  
  return (
<div>
  {left}
  <Button text="left" onClick = {handleLeftClick} /> 
  <Button text="right" onClick = {handleRightClick} /> 
  {right}
  <History array = {history} />
  <p> total: {total}</p>
</div>
  )
}
export default App;