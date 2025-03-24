const Header = (props) => <h1>{props.course}</h1>

const Content = (props) => (
  <div>
    {props.parts.map((part) =>
      <Part key={part.id} part={part} />
    )}
  </div>
)

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

// const Total = (props) => <p>Number of exercises {props.total}</p>
const Total = (props) => {
  const total = props.parts.reduce((s, p) => {
    return s + p.exercises
  }, 0)
  return (
    <p><b>total of {total} exercises</b></p>
  )
}

const Course = (props) => {
  return (
    <>
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </>
  )
}

export default Course