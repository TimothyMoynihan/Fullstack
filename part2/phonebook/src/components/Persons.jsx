const Persons = ({ list , clickDelete}) => {
    return(
      <table>
        <tbody>
          {list.map((p) => (
            <tr key={p.id}>
              <td>{p.name} {p.number}</td>
              <td><button onClick={() => clickDelete(p.id)}>delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

export default Persons