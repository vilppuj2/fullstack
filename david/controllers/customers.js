const customersRouter = require('express').Router()

const { v4: uuidv4 } = require('uuid')


let customers = []

const generateId = () => {
  const maxId = customers.length > 0
    ? Math.max(...customers.map(c => c.id))
    : 0
  return maxId + 1
}


customersRouter.get('/', (req, res) => {
  res.json(customers)
})

customersRouter.post('/', (req, res) => {
  const body = req.body
  if (!body.name) {
    return res.status(400).json({
      error: 'name missing'
    })
  }

  const customer = {
    id: generateId(),
    uuid: uuidv4(),
    name: body.name,
    is_active: body.is_active || false
  }

  customers = customers.concat(customer)
  res.status(201).json(customer)
})

customersRouter.patch('/:id', (req, res) => {
  const id = Number(req.params.id)
  const body = req.body

  const customer = customers.find(c => c.id === id)
  const index = customers.indexOf(customer)

  const updatedCus = {
    id: customer.id,
    uuid: customer.uuid,
    name: body.name || customer.name,
    is_active: body.is_active === undefined ? customer.is_active : body.is_active
  }

  customers[index] = updatedCus
  res.json(updatedCus)
})

customersRouter.delete('/:id', (req, res) => {
  const id = Number(req.params.id)
  customers = customers.filter(c => c.id !== id)

  res.status(204).end()
})


module.exports = customersRouter