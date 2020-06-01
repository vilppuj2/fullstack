import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('<BlogForm /> calls createBlog with correct params', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'Testing purposes' }
  })
  fireEvent.change(author, {
    target: { value: 'Mr. Tester' }
  })
  fireEvent.change(url, {
    target: { value: 'test.purp' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls[0][0].title).toBe('Testing purposes' )
  expect(createBlog.mock.calls[0][0].author).toBe('Mr. Tester' )
  expect(createBlog.mock.calls[0][0].url).toBe('test.purp' )
})