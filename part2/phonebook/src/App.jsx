import { useEffect, useState } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import './App.css'

const App = () => {
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState('success')
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const [newNumber, setNewNumber] = useState('')
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const [search, setSearch] = useState('')
  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const handleAdd = (event) => {
    event.preventDefault()

    const user = persons.find(user => user.name === newName)

    // if the person is already in the list
    if (user == undefined) {
      // add the person to the list
      personService
        .create({name: newName, number: newNumber})
        .then(response => {
          setPersons(persons.concat(response))
          setNotificationType('success')
          setNotificationMessage(`Added ${response.name}`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
      // reset the fields
      setNewName("")
      setNewNumber("")
    } else {
      // alert the useer to the duplicate user
      if(confirm(`${newName} is already added to phonebook, replace the old number with new one?`)) {
        console.log('Update User')
        personService
          .update(user.id, {name: newName, number: newNumber})
          .then(response => {
            setPersons(persons.map(p => p.id === user.id ? response : p))
            setNotificationType('success')
            setNotificationMessage(`Updated ${response.name}`)
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
          })
          .catch(error => {
            setNotificationType('failure')
            setNotificationMessage(`Information of ${newName} has already been removed from server`)
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
          })
      }

      // don't remove the existing entry. Give them an option to fix it
    }
  }

  const handleDelete = (id) => {
    const toDelete = persons.find(p => p.id === id)
    if(confirm(`Delete ${toDelete.name}`)) {
      personService
        .remove(id)
        .then(response => {
          console.log(response)
          setPersons(persons.filter(p => p.id !== response.id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} type={notificationType} />
      <Filter value={search} onChange={handleSearch} />
      <h3>add a new</h3>
      <PersonForm submit={handleAdd} 
        nameVal={newName} nameHandler={handleNewName}
        numVal={newNumber} numHandler={handleNewNumber}
      />
      <h2>Numbers</h2>
      <Persons 
        list={persons.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))}
        clickDelete={handleDelete}
      />
    </div>
  )
}

export default App