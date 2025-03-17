const Header = (props) => {
  console.log(props);
  return (
    props.course
  )
}

const Content = (props) => {
  console.log(props);
  return (
    <div>
      <Part part={props.parts.parts[0]}/>
      <Part part={props.parts.parts[1]}/>
      <Part part={props.parts.parts[2]}/>
    </div>
  )
}

const Part = (props) => {
  console.log(props);
  return (
    <p>{props.part.name} {props.part.exercises}</p>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.parts.parts[0].exercises + props.parts.parts[1].exercises + props.parts.parts[2].exercises}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <h1><Header course={course.name}/></h1>
      <Content parts = {course}/>
      <Total parts = {course}/>
    </div>
  )
}

export default App