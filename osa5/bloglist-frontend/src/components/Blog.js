import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeBlog, username, removeBlog }) => {
  const [complete, setComplete] = useState(false)

  const toggleComplete = () => {
    setComplete(!complete)
  }

  const removeButton = () => {
    if (username === blog.user.username) {
      return (
        <div>
          <button onClick={removeBlog}>remove</button>
        </div>
      )
    }
    return null
  }

  const infoToShow = () => {
    if (complete) {
      return (
        <div>
          {blog.url}
          <div>
            likes {blog.likes}
            <button onClick={likeBlog}>like</button>
          </div>
          {blog.user.name}
          {removeButton()}
        </div>
      )
    }
    return null
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleComplete}>{complete ? 'hide' : 'view'}</button>
      </div>
      {infoToShow()}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog