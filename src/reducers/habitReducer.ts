const initialState = {
    items: [],
    selectedHabit: null
};

const habitReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_DATA':
            return {
                ...state,
                items: action.payload.data
            };
        case 'SELECT_HABIT':
            return {
                ...state,
                selectedHabit: action.payload.id
            };
        default:
            return state;
    }
};

export default habitReducer;