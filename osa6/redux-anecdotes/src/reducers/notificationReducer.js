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

export const setNotification = (content) => {
  return {
    type: 'SET_NOTI',
    content
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTI'
  }
}

export default notificationReducer