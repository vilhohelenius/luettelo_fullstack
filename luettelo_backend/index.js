require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

app.use(express.json())
app.use(express.static('build'))
app.use(morgan('tiny'))
app.use(cors())



  app.get('/info', (req, res) => {
    const dateAndTime = new Date()
    Person.find({}).then(persons => {
      res.send(`<p> Phonebook has info for ${persons.length} people <br/> ${dateAndTime} </p>`)
    })
})
  
  app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
      res.json(persons)
      })
  })



  app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(persons => {
      if (persons) {
        response.json(persons)
      } else {
        response.status(404).end()
      }
    })  
  })

  app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndRemove(request.params.id)
    .then(() => response.status(204).end())
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

    if (body.name === undefined) {
      return res.status(400).json({ 
        error: 'name missing' 
      })
    }

    if (body.number === undefined) {
        return res.status(400).json({ 
          error: 'number missing' 
        })
      }
    
  
    const person = new Person({
      name: body.name,
      number: body.number,
      id: generateId(),
    })
  
    person.save().then(savedPerson => {
      res.json(savedPerson)
    })
  })
  
  const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
    