interface ContentProps {
  courseParts: Array<{ name: string, exerciseCount: number }>;
}

const Content = (props: ContentProps) => {
  return (
    <>
      {props.courseParts.map(part => {
        return (<p key={part.name}>{part.name} {part.exerciseCount}</p>)
      })}
    </>
  )
};


export default Content;