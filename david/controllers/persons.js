const personsRouter = require('express').Router()

const { v4: uuidv4 } = require('uuid')


let persons = []

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(p => p.id))
    : 0
  return maxId + 1
}


personsRouter.get('/', (req, res) => {
  res.json(persons)
})

personsRouter.post('/', (req, res) => {
  const body = req.body
  if (!body.first_name || !body.last_name) {
    return res.status(400).json({
      error: 'full name missing'
    })
  }

  const person = {
    id: generateId(),
    uuid: uuidv4(),
    customer_id: body.customer_id || null,
    first_name: body.first_name,
    last_name: body.last_name,
    role: body.role || 'visitor',
    is_deleted: body.is_deleted || false
  }

  persons = persons.concat(person)
  res.json(person)
})

personsRouter.patch('/:id', (req, res) => {
  const id = Number(req.params.id)
  const body = req.body

  const person = persons.find(p => p.id === id)
  const index = persons.indexOf(person)

  const updatedPer = {
    id: person.id,
    uuid: person.uuid,
    customer_id: body.customer_id === undefined ? person.customer_id : body.customer_id,
    first_name: body.first_name || person.first_name,
    last_name: body.last_name || person.last_name,
    role: body.role || person.role,
    is_deleted: body.is_deleted === undefined ? person.is_deleted : body.is_deleted
  }

  persons[index] = updatedPer
  res.json(updatedPer)
})

personsRouter.delete('/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(p => p.id !== id)

  res.status(204).end()
})


module.exports = personsRouter