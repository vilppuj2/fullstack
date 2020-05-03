import React from 'react'


const Course = ({ course }) => (
  <div>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
)
  
const Header = ({ name }) => (
  <div>
    <h2>{name}</h2>
  </div>
)

const Content = ({ parts }) => (
  <div>
    {parts.map(part =>
      <Part key={part.id} name={part.name} exercises={part.exercises} />
    )}
  </div>
)

const Part = ({ name, exercises }) => (
  <div>
    <p>{name} {exercises}</p>
  </div>
)

const Total = ({ parts }) => {
  const total = parts.reduce( (sum, part) => sum + part.exercises, 0 )
  return (
    <div>
      <b>total of {total} exercises</b>
    </div>
  )
}


export default Course