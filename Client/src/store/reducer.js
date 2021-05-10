const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                currentUser: action.payload
            }
        default:
            throw new Error();
    }
}

export default Reducer;