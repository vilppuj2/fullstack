const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  // console.log(action)
  switch (action.type) {
    case 'GOOD':
      const goodChange = {
        ...state,
        good: state.good + 1
      }
      return goodChange
    case 'OK':
      const okChange = {
        ...state,
        ok: state.ok + 1
      }
      return okChange
    case 'BAD':
      const badChange = {
        ...state,
        bad: state.bad + 1
      }
      return badChange
    case 'ZERO':
      return initialState
    default: return state
  }
  
}

export default counterReducer