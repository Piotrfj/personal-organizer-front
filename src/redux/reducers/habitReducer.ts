import {HabitLog} from "../../shared/models";

interface initialStateInterface {
    items: any[]
    selectedHabit: string,
    log: HabitLog[];
    lastCheckLog: {number, string}[]
}

const initialState: initialStateInterface = {
    items: [],
    selectedHabit: null,
    log: [],
    lastCheckLog: []
};

const habitReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_DATA':
            return {
                ...state,
                items: action.payload.data
            };
        case 'ADD_HABIT':
            return {
                ...state,
                items: [
                    ...state.items,
                    action.payload.content
                ]
            };
        case 'UPDATE_HABIT':
            return {
                ...state,
                items: state.items.map(habit => habit.id === action.payload.id ? action.payload : habit),
            };
        case 'LOAD_LAST_CHECK_LOG':
            return {
                ...state,
                lastCheckLog: action.payload
            };
        case 'SELECT_HABIT':
            return {
                ...state,
                selectedHabit: action.payload.id
            };
        case 'LOAD_LOG':
            return {
                ...state,
                log: action.payload.data
            };
        case 'CHECK_HABIT':
            return {
                ...state,
                log: [
                    ...state.log,
                    action.payload.log
                ]
            };
        default:
            return state;
    }
};

export default habitReducer;