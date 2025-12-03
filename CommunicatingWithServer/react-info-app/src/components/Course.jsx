const Course = ({course}) => {
  return (
    <>
    <h1>{course.name}</h1>
    {course.parts.map(part => <p key = {part.id}>{part.name} {part.exercises}</p>)}
    <footer>Total {course.parts.reduce((accum, curr) => accum+curr.exercises, 0)}</footer>
    </>
  )
}
export default Course;