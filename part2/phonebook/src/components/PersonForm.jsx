const PersonForm = (props) => {
  return(
    <form onSubmit={props.submit}>
      <div>
        name: <input value={props.nameVal} onChange={props.nameHandler} /> <br />
        number: <input value={props.numVal} onChange={props.numHandler} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm