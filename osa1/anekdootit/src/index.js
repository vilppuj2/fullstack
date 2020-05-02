import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Anecdote = ({ anecdote, votes }) => (
  <div>
    <div>{anecdote}</div>
    <div>has {votes} votes</div>
  </div>
)

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = (props) => {
  const amount = props.anecdotes.length

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array.apply(null, new Array(amount)).map(Number.prototype.valueOf, 0))

  const mostVotes = votes.indexOf(Math.max(...votes))

  const showNext = () => (
    setSelected(Math.round(Math.random() * (amount - 1)))
  )

  const voteFor = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={props.anecdotes[selected]} votes={votes[selected]} />
      <Button onClick={voteFor} text='vote' />
      <Button onClick={showNext} text='next anecdote' />
      <h1>Anecdote with most votes</h1>
      <Anecdote anecdote={props.anecdotes[mostVotes]} votes={votes[mostVotes]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
