import React from 'react'

export default function Header(props) {
    return <>
        {props.course.parts.map(function (obj) {

            return <p> {obj.name + " " + obj.exercises} </p>;
        })}
    </>
}