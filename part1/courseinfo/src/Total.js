import React from 'react'

export default function Total(props) {
    let total = 0
    props.course.parts.forEach(element => {
        total = total + element.exercises
    });

    return <>
        <p>Number of exercises {total}</p>
    </>
}