import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'Testing purposes',
    author: 'Mr. Tester',
    url: 'test.purp',
    likes: 12,
    user: {
      username: 'jvilppula',
      name: 'Juuso Vilppula'
    }
  }
  const username = 'mrtester'
  const likeBlog = jest.fn()
  const removeBlog = jest.fn()

  let component

  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        username={username}
        likeBlog={likeBlog}
        removeBlog={removeBlog}
      />
    )
  })

  test('renders only title and author at start', () => {
    expect(component.container).toHaveTextContent('Testing purposes')
    expect(component.container).toHaveTextContent('Mr. Tester')
    expect(component.container).not.toHaveTextContent('test.purp')
    expect(component.container).not.toHaveTextContent('12')
  })

  test('renders all info when corresponding button is pressed', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('Testing purposes')
    expect(component.container).toHaveTextContent('Mr. Tester')
    expect(component.container).toHaveTextContent('test.purp')
    expect(component.container).toHaveTextContent('12')
  })

  test('clicking the like button calls event handler as many times', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(likeBlog.mock.calls).toHaveLength(2)
  })
})