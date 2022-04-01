import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const Togglable = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <Button size='sm' variant='info' onClick={toggleVisibility}>{props.buttonLabel1}</Button>
            </div>
            <div style={showWhenVisible} className="togglableContent">
                {props.children}
                <Button size='sm' variant='info' onClick={toggleVisibility}>{props.buttonLabel2}</Button>
            </div>
        </div>
    )
})
Togglable.displayName = 'Togglable'

Togglable.propTypes = {
    buttonLabel1: PropTypes.string.isRequired,
    buttonLabel2: PropTypes.string.isRequired
}
export default Togglable