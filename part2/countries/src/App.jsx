import { useEffect, useState } from 'react'
import axios from 'axios'
import CountryList from './components/CountryList'

const App = () => {
  const [countries, setCountries] = useState([])
  const [myFilter, setMyFilter] = useState('')
  const handleFilter = (event) => {
    setMyFilter(event.target.value)
  }

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
        console.log('countries set')
      })
  }, [])

  const handleShow = (nm) => {
    setMyFilter(nm)
  }
 
  return (
    <div>
      <form>
        find countries <input value={myFilter} onChange={handleFilter} />
      </form>
      <CountryList 
        data={countries.filter((c) => c.name.common.toLowerCase().includes(myFilter.toLowerCase()))} 
        showme={handleShow}
      />
    </div>
  )
}

export default App
