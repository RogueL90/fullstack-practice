const mongoose = require('mongoose')

if(process.argv.length < 3){
    console.log("Must enter a password")
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://pranayj493_db_user:${password}@phonebook.ffqhixn.mongodb.net/?appName=phonebook`

mongoose.set('strictQuery',false)
mongoose.connect(url, {family: 4})

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length===3){
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person)
        })
    }).finally(res => {
        mongoose.connection.close()
    process.exit(1)
    })
}

const newPerson = new Person({
    name: process.argv[3],
    number: process.argv[4],
})

newPerson.save().then(result => {
    console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
    mongoose.connection.close()
})
