const customersRouter = require('express').Router()

const { v4: uuidv4 } = require('uuid')


// let customers = []
let customers = [
  {
    id: 1,
    uuid: '3b2a7066-7a14-486a-bf7a-35db9a3712eb',
    name: 'Pekka Aho',
    is_active: true
  },
  {
    id: 2,
    uuid: '97e1ef7f-d29c-4db8-a4ff-8c9d72c343d9',
    name: 'Matti Meikäläinen',
    is_active: false
  },
  {
    id: 3,
    uuid: 'be22f7f5-0355-4bb2-87f6-a8b7617ddc2b',
    name: 'Kalle Kalle',
    is_active: true
  }
]

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
  res.json(customer)
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
    is_active: body.is_active || customer.is_active
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