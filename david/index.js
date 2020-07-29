const express = require('express')
const app = express()

const customersRouter = require('./controllers/customers')
const personsRouter = require('./controllers/persons')


app.use(express.json())

app.use('/api/customers', customersRouter)
app.use('/api/persons', personsRouter)


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})