import React from 'react'
import { filterAction } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const Filter = () => {
    const dispatch = useDispatch()

    const handleChange = (e) => {
        const data = e.target.value
        dispatch(filterAction(data))
    }

    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            Filter <input name='anecdoteFilter' onChange={handleChange} />
        </div>
    )
}

export default Filter