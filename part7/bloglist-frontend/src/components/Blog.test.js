import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Togglable from './Togglable'
import Blog from './Blog'

describe('<Blog />', () => {
    let component

    beforeEach(() => {
        let blog = {
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            __v: 0,
            user: { username: "" }
        }
        function handleDelete() { }
        function handleUpdate() { }
        component = render(
            <Blog blog={blog} handleUpdate={handleUpdate} handleDelete={handleDelete} username={""}></Blog>
        )
    })

    test('renders its children', () => {
        expect(
            component.container.querySelector('.testDiv')
        ).toBeDefined()
    })

    test('at start the children are not displayed', () => {
        const div = component.container.querySelector('.togglableContent')

        expect(div).toHaveStyle('display: none')
    })

    test('after clicking the button, children are displayed', () => {
        const button = component.getByText('show')
        fireEvent.click(button)

        const div = component.container.querySelector('.togglableContent')
        expect(div).not.toHaveStyle('display: none')
    })

})

describe('<Togglable />', () => {
    let component

    beforeEach(() => {
        component = render(
            <Togglable buttonLabel1="show" buttonLabel2="hide">
                <div className="testDiv" />
            </Togglable>
        )
    })

    test('renders its children', () => {
        expect(
            component.container.querySelector('.testDiv')
        ).toBeDefined()
    })

    test('at start the children are not displayed', () => {
        const div = component.container.querySelector('.togglableContent')

        expect(div).toHaveStyle('display: none')
    })

    test('after clicking the button, children are displayed', () => {
        const button = component.getByText('show')
        fireEvent.click(button)

        const div = component.container.querySelector('.togglableContent')
        expect(div).not.toHaveStyle('display: none')
    })

})