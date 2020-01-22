import {getHabits} from "../services/habit-service";

export const loadHabits = () => dispatch => {
    getHabits()
        .then(res =>
            dispatch({
                type: 'LOAD_DATA',
                payload: {
                    data: res.data
                }
            })
        );
};

export const selectHabit = (id: number) => ({
    type: 'SELECT_HABIT',
    payload: {
        id
    }
});