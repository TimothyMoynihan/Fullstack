import Weather from "./Weather"

const CountryList = ({data, showme}) => {
    if (data.length == 250 || data.length == 0) return ('')
    if (data.length > 10) return ('Too many matches, specify another filter')
    if (data.length > 1) return (
      data.map(c => 
        <p key={c.name.common}>{c.name.common} <button onClick={() => showme(c.name.common)}>Show</button></p>
      )
    )
    console.log(data)
    const displayData = data[0]
    return(
      <div>
        <h1>{displayData.name.common}</h1>
        <p>
          Capital {displayData.capital}<br />
          Area {displayData.area}
        </p>
  
        <h2>Languages</h2>
        <ul>
          {Object.entries(displayData.languages).map(([key, value]) => (  
            <li key={key}>{value}</li>
          ))}
        </ul>
        <div>
          <img src={displayData.flags.png} alt={displayData.flags.alt} />
        </div>
        <Weather lat={displayData.capitalInfo.latlng[0]} lon={displayData.capitalInfo.latlng[1]} city={displayData.capital} />
      </div>
    )
  }

export default CountryList