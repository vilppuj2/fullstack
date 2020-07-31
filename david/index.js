const express = require('express')

const customersRouter = require('./controllers/customers')
const personsRouter = require('./controllers/persons')


const app = express()
app.use(express.json())

app.use('/api/customers', customersRouter)
app.use('/api/persons', personsRouter)


const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})