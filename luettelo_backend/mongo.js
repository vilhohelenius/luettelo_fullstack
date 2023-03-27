const mongoose = require('mongoose')

const password = process.argv[2]
const addName = process.argv[3]
const addNum = process.argv[4]


const url =
    `mongodb+srv://vilizu:${password}@cluster0.lthjsoo.mongodb.net/luetteloApp?retryWrites=true&w=majority`

mongoose.connect(url)


const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
  }

  else if (process.argv.length === 3) {
    console.log('Phonebook:')
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
}

else if (process.argv.length === 4) {
    console.log('Invalid argument, add number as the fifth argument.')
    process.exit(1)
}

else if (process.argv.length === 5) {
    const personFromCommandLine = new Person({
        name: addName,
        number: addNum,
    })
    console.log(personFromCommandLine)
    personFromCommandLine.save().then(result => {
        console.log(`Added ${addName} , ${addNum} to phonebook`)
        mongoose.connection.close()
    })
}

else if (process.argv.length > 5) {
    console.log('Invalid argument, too many arguments given.')
    process.exit(1)
}