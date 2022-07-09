interface TotalProps {
  courseParts: Array<{ name: string, exerciseCount: number }>;
}

const Total = (props: TotalProps) => {
  return (
    <>
      <p>
        Number of exercises{" "}
        {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </>
  )
};


export default Total;