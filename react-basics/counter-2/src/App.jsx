import { useState } from 'react'

const Button = (props) => {
return(
    <button onClick = {props.onClick}>{props.text}</button>
)
}
const Display = (props) => <p>{props.value}</p>

const App = () => {
  const [value, setValue] = useState(10)
  const setToValue = (val) => {
    console.log("new value: ", val);
    setValue(val);
  }
  return(
<div>
  <Display value = {value}/>
  <Button onClick = {() => setToValue(1000)} text = "thousand" />
  <Button onClick = {() => setToValue(0)} text = "zero" />
  <Button onClick = {() => setToValue(value+1)} text = "increment" /> 
</div>
  )
}
export default App;