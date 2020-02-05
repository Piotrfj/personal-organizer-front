import {HabitItem, HabitLog} from "../../shared/models";
import {HabitActionTypes} from "../types";

interface initialStateInterface {
    items: HabitItem[]
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

interface HabitAction {
    type: HabitActionTypes,
    payload: any,
}

const habitReducer = (state = initialState, action: HabitAction) => {
    switch (action.type) {
        case HabitActionTypes.LOAD_HABITS:
            return {
                ...state,
                items: action.payload.data
            };
        case HabitActionTypes.ADD_HABIT:
            return {
                ...state,
                items: [
                    ...state.items,
                    action.payload.content
                ]
            };
        case HabitActionTypes.UPDATE_HABIT:
            return {
                ...state,
                items: state.items.map(habit => habit.id === action.payload.id ? action.payload : habit),
            };
        case HabitActionTypes.LOAD_LAST_CHECK_LOG:
            return {
                ...state,
                lastCheckLog: action.payload
            };
        case HabitActionTypes.SELECT_HABIT:
            return {
                ...state,
                selectedHabit: action.payload.id
            };
        case HabitActionTypes.LOAD_LOG:
            return {
                ...state,
                log: action.payload.data
            };
        case HabitActionTypes.CHECK_HABIT:
            return {
                ...state,
                log: [
                    ...state.log,
                    action.payload.log
                ]
            };
        case HabitActionTypes.SWAP_HABITS:
            return {
                ...state,
                items: [
                    ...(() => {
                        const {firstHabit, secondHabit} = action.payload;
                        return state.items.map(habit => {
                            if (habit.id === firstHabit.id) habit.positionOrder = secondHabit.positionOrder;
                            else if (habit.id === secondHabit.id) habit.positionOrder = firstHabit.positionOrder;
                            return habit;
                        })
                    })()
                ]
            };
        case HabitActionTypes.DELETE_HABIT:
            return {
                ...state,
                items: [
                    ...state.items.filter(habit => habit.id !== action.payload)
                ]
            };
        case HabitActionTypes.UPDATE_LOG:
            return {
                ...state,
                log: [
                    ...state.log.map(log => log.id === action.payload.id ? action.payload : log)
                ]
            };
        default:
            return state;
    }
};

export default habitReducer;