


const rootReducer = (state = {}, action) => {
    switch (action.type) {
        case 'REMOVE_ITEM':
            console.log('works');
            console.log(action);
        // return {
            //     ...state,
            //     [action.payload.itemType]: [
            //         ...state[action.payload.itemType].filter(item => item.id !== action.payload.id),
            //     ],
            // };
        default:
            return state;
    }
};

export default rootReducer;