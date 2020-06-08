const initialState = {
  content: null,
  timeoutID: null
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTI':
      clearTimeout(state.timeoutID)
      return {
        content: action.data.content,
        timeoutID: action.data.timeoutID
      }

    case 'REMOVE_NOTI':
      return initialState

    default:
      return state
  }
}

export const setNotification = (content, time) => {
  return async dispatch => {
    const timeoutID = setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTI'
      })
    }, time * 1000)

    await dispatch({
      type: 'SET_NOTI',
      data: { content, timeoutID }
    })
  }
}

export default notificationReducer