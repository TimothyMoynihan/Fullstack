import { useState } from 'react'

const StatisticLine = ({text, value, mod}) => {
  console.log(text, value, mod)
  return (
    <><tr><td>{text}</td><td>{value} {mod !== undefined ? mod : null}</td></tr></>
  )
}

const Statistics = (props) => {
  console.log(props)
   return(
    <table><tbody>
      <StatisticLine text='good' value={props.good} />
      <StatisticLine text='neutral' value={props.neutral} />
      <StatisticLine text='bad' value={props.bad} />
      <StatisticLine text='all' value={props.good + props.neutral + props.bad} />
      <StatisticLine text='average' value={(props.good - props.bad) / (props.good + props.neutral + props.bad)} />
      <StatisticLine text='positive' value={props.good / (props.good + props.neutral + props.bad)} mod='%' />
      </tbody></table>
   )
}

const Button = (props) => (
  <button onClick={props.onClick}>{props.text}</button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const onGoodClick = () => {
    console.log("Good Click")
    setGood(good + 1)
  }
  const onNeutralClick = () => {
    console.log("Neutral Click")
    setNeutral(neutral + 1)
  }
  const onBadClick = () => {
    console.log("Bad Click")
    setBad(bad + 1)
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={onGoodClick} text='Good' />
      <Button onClick={onNeutralClick} text='Neutral' />
      <Button onClick={onBadClick} text='Bad' />
      <h2>statistics</h2>
      {good || neutral || bad ? <Statistics good={good} neutral={neutral} bad={bad} /> : <p>No feedback given</p>}
    </div>
  )
}

export default App