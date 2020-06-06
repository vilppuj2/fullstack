const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTI':
      return action.content

    case 'REMOVE_NOTI':
      return null

    default:
      return state
  }
}

export const setNotification = (content, time) => {
  return async dispatch => {
    await dispatch({
      type: 'SET_NOTI',
      content
    })
    setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTI'
      })
    }, time * 1000)
  }
}

export default notificationReducer