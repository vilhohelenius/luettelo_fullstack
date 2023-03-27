
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(express.static('build'))
app.use(morgan('tiny'))
app.use(cors())

let persons = [
    {
      name: "Arto Hellas",
      number: "040-123456",
      id: 1
    },
    {
      name: "Ada Lovelace",
      number: "39-44-5323523",
      id: 2
    },
    {
      name: "Dan Abramov",
      number: "12-43-234345",
      id: 3
    },
    {
      name: "Mary Poppendieck",
      number: "39-23-6423122",
      id: 4
    }
  ]



  app.get('/info', (req, res) => {
    const handlingTime = new Date()
    res.send(`<p> Phonebook has info for ${persons.length} people <br/> ${handlingTime} </p>`)
})
  
  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })



  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
  
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  
    response.json(person)
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

  const generateId = () => {
    min = 10
    max = 1000
    randID = Math.floor(Math.random() * (max - min) + min)
    return randID
  }
  
  app.post('/api/persons', (req, res) => {
    const body = req.body
    console.log(body)

    if (!body.name) {
      return res.status(400).json({ 
        error: 'name missing' 
      })
    }

    if (!body.number) {
        return res.status(400).json({ 
          error: 'number missing' 
        })
      }

    if (persons.some(p => p.name === body.name)){
        return res.status(400).json({
            error: 'name already exists'
        })
    }
  
    const person = {
      name: body.name,
      number: body.number,
      id: generateId(),
    }
  
    persons = persons.concat(person)
  
    res.json(person)
  })
  
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
    