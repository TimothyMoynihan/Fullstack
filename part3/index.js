const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
//morgan.token('body', (req) => JSON.stringify(req.body))
morgan.token('body', (request, response) => JSON.stringify(request.body))

app.use(express.json())
app.use(morgan(':method :url :status :response-time ms - :body'))
app.use(cors())

let persons = [
  { 
    "id": "1",
    "name": "Arto Hellas2", 
    "number": "040-123456"
  },
  { 
    "id": "2",
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": "3",
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": "4",
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(p => p.id === id)

    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
    
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(p => p.id !== id)

    response.status(204).end()
  })

  app.post('/api/persons', (request, response) => {
    const person = { ...request.body }
    person.id = Math.floor(Math.random() * 1000).toString()
    // console.log(person)

    const findPerson = persons.find(p => p.name === person.name)
    if (findPerson) {
      return response.status(400).json({
        error: 'name must be unique'
      })
    } else {
      console.log('Person not found as expected')
    }

    console.log(person)
    if(!person || !person.name || !person.number) {
      return response.status(400).json({
        error: 'conent missing'
      })
    }

    persons = persons.concat(person)
    response.json(person)
  })

  app.get('/info', (request, response) => {
    const now = new Date() 
    response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${now}</p>`)
  })

  app.put('/api/persons/:id', (request, response) => {
    const updatePerson = { ...request.body }
    updatePerson.id = request.params.id
    persons = persons.map(p => p.id === updatePerson.id ? updatePerson : p)

    response.json(updatePerson)
  })
  
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })