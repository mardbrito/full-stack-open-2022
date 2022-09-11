const Header = ({ course }) => <h2>{course}</h2>;

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => {
    return (sum += part.exercises);
  }, 0);

  return (
    <div>
      <p>
        <strong>Total of exercises {total}</strong>
      </p>
    </div>
  );
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} {...part} />
      ))}
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
