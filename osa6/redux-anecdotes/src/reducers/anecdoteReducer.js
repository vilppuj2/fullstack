import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'CREATE_ANEC':
      return [...state, action.data]

    case 'INIT_ANECS':
      const sortedData = action.data.sort((a, b) => b.votes - a.votes)
      return sortedData

    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      const newState = state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
      return newState.sort((a, b) => b.votes - a.votes)

    default:
      return state
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE_ANEC',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECS',
      data: anecdotes
    })
  }
}

export const voteFor = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    await anecdoteService.update(updatedAnecdote, anecdote.id)
    dispatch({
      type: 'VOTE',
      data: { id: anecdote.id }
    })
  }
}

export default anecdoteReducer