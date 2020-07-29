const customersRouter = require('express').Router()

let customers = [
  {
    id: 1,
    uuid: 23456789,
    name: 'Pekka Aho',
    is_active: true
  },
  {
    id: 2,
    uuid: 96456767,
    name: 'Matti Meikäläinen',
    is_active: false
  },
  {
    id: 3,
    uuid: 25898332,
    name: 'Kalle Kalle',
    is_active: true
  }
]


customersRouter.get('/', (req, res) => {
  res.json(customers)
})
/*
const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}
*/
customersRouter.post('/', (req, res) => {
  const body = req.body
  /*
  if (!body.content) {
    return res.status(400).json({
      error: 'content missing'
    })
  }
  */
  const customer = {
    id: body.id,
    uuid: 5555,
    name: body.name,
    is_active: body.is_active || false
  }

  customers = customers.concat(customer)

  res.json(customer)
})

customersRouter.put('/:id', (request, response) => {
  const id = Number(request.params.id)
  const body = request.body

  const customer = customers.find(customer => customer.id === id)
  const index = customers.indexOf(customer)

  const updatedCus = {
    id: id,
    ...body
  }
  console.log(updatedCus)

  customers[index] = updatedCus

  response.json(updatedCus)
})

customersRouter.delete('/:id', (request, response) => {
  const id = Number(request.params.id)
  customers = customers.filter(customer => customer.id !== id)

  response.status(204).end()
})

module.exports = customersRouter