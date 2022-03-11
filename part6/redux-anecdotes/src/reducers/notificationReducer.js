const reducer = (state = "", action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return state = action.data
        default:
            return state
    }
}

export const notificationAction = (data, time) => {
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            data: data
        })
        const timeoutID = setTimeout(() => {
            //clearTimeout(timeoutID);
            dispatch({
                type: 'SET_NOTIFICATION',
                data: ""
            })
        }, time * 1000)
        //clearTimeout(timeoutID);
    }
}

export default reducer