import {useState} from 'react'
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const Button = ({name, onClick}) => <button onClick = {onClick}>{name}</button>

  const StatisticLine = ({text, value}) => <tr><td>{text}</td><td>{value}</td></tr>
  const Statistics = (props) => {
    if(props.good || props.neutral || props.bad)
    return(
      <div>
    <h1>statistics</h1>
    <table>
      <tbody>
    <StatisticLine text = "good" value = {props.good} />
    <StatisticLine text = "neutral" value = {props.neutral} />
    <StatisticLine text = "bad" value = {props.bad} />
    <StatisticLine text = "all" value = {props.all} />
    <StatisticLine text = "avg" value = {props.avg} />
    <StatisticLine text = "percent" value = {props.percent} />
    </tbody>
    </table>
    </div>
    )
    return (<p>No feedback given</p>)
  }

  const goodHandler = () => {
    setGood(good+1);
  }

  const badHandler = () => {
    setBad(bad+1);
  }

  const neutralHandler = () =>{
    setNeutral(neutral+1);
  }

  let all = good+bad+neutral;
  let avg = (good-bad)/all
  let percent = good/all

  return(
    <>
    <div>
      <h1>give feedback</h1>
    </div>
    <div>
    <Button name = "good" onClick = {goodHandler} />
    <Button name = "neutral" onClick = {neutralHandler} />
    <Button name = "bad" onClick = {badHandler} />
    </div>
    <Statistics good = {good} neutral = {neutral} bad = {bad} all = {all} avg = {avg} percent = {percent} />
    </>
  )
}

export default App;