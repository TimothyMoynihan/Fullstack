import { useState } from 'react'

const Button = (props) => {
  return(
    <button onClick={props.onClick}>{props.text}</button>
  )
}

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
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0,0,0,0,0,0,0,0])

  function maxSelected() {
    var max = votes[0];
    var maxIndex = 0;

    for(var i = 1; i < votes.length; i++) {
      if (votes[i] > max) {
        maxIndex = i;
        max = votes[i];
      }
    }
    return maxIndex;
  }

  const onClickNext = () => {
    const min = 0;
    const max = anecdotes.length - 1;
    const randomMun = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log(randomMun)
    setSelected(randomMun)
  }

  const onClickVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1;
    setVotes(newVotes)
    console.log(newVotes)
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <br />
      has {votes[selected]} votes
      <br />
      <Button onClick={onClickVote} text='vote' />
      <Button onClick={onClickNext} text='next anecdote' />
      <h2>Anecdote with most votes</h2>
      {anecdotes[maxSelected()]}
      <br />
      has {votes[maxSelected()]} votes
    </div>
  )
}

export default App