import { useState, useEffect } from 'react'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'
import personService from './Services/persons'


const App = () => {

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])


  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilter] = useState('')

//Nollataan nimi ja numero vasta lopuksi, jotta esim duplikaatin sattuessa nimeä voi vielä korjata
//eikä tarvitse kirjoittaa kokonaan uudestaan
  const addNew = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)){
      alert(`${newName} is already added to phonebook`)
    }else{
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
          .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
    }
    setNewName('')
    setNewNumber('')
  }


  const filterPersons = filterValue.length > 0
    ? persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase()) === true)
    : persons


  const deletePersonID = (id) => {
    const deleteThisPerson = persons.find(person => person.id === id)
    if(window.confirm(`Do you want to delete ${deleteThisPerson.name}?`)){
      personService
      .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }


  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }


  return (
    <div>
      <h1>Phonebook</h1>

      <Filter
        filterValue={filterValue} handleFilterChange={handleFilterChange}
      />

      <h2>Add new person</h2>

      <PersonForm 
        addNew={addNew} newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>

      <Persons
        filterPersons={filterPersons} deletePerson={deletePersonID}
      />
    </div>
  )
}

export default App