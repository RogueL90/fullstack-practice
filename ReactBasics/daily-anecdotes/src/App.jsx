import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const setRandom = () => Math.floor(Math.random()*anecdotes.length)
  const [selected, setSelected] = useState(setRandom())

  const handleVote = () => {
    const arr = [...votes]
    arr[selected]++;
    setVotes(arr);
  }
  const handleNext = () => setSelected(setRandom())

  const popularIndex = () =>{
    let max = 0;
    for(let i = 0; i<anecdotes.length; i++){
      if(votes[i]>votes[max]) max= i;
    }
    return max;
  }

  const AnecdoteWithMostVotes = () => {
    const pop = popularIndex();
    if(votes[pop]>0)
    return(
      <div>
      <h1>Anecdote with the most votes</h1>
      <p>{anecdotes[popularIndex()]}</p>
      <p>has {votes[popularIndex()]} votes</p>
      </div>
    )
    return(
      <div>
        <p>Start voting to display most popular anecdote!</p>
      </div>
    )
  }
  return (
    <div>
      <div>
        <h1>Anecdotes</h1>
      {anecdotes[selected]}
      <br />
      <p>has {votes[selected]} votes.</p>
      <br />
      <button onClick = {handleVote} >vote</button>
      <button onClick = {handleNext}>next anecdote</button>
      </div>
      <AnecdoteWithMostVotes />
    </div>
  )
}

export default App