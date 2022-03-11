const reducer = (state = "", action) => {
    switch (action.type) {
        case 'SEARCH':
            return state = action.data
        default:
            return state
    }
}

export const filterAction = (data) => {
    return {
        type: 'SEARCH',
        data: data
    }
}

export default reducer