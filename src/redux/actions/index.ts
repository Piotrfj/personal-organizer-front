import {createHabit, getHabits, getLastLogs, getLog, setHabit, updateHabit} from "../../services/habit-service";
import store from 'redux/store';
import {HabitLogType} from "../../shared/model-enum";

export const selectHabit = (id: number) => ({
    type: 'SELECT_HABIT',
    payload: {
        id
    }
});

export const addHabit = (content: string) => dispatch => {
    createHabit(content)
        .then(res => {
            dispatch({
                type: 'ADD_HABIT',
                payload: {
                    content: res.data
                }
            });
        });
};

export const editHabit = (id: number, content: string) => dispatch => {
    console.log('tete');
    updateHabit(id, content)
        .then(res => {
            dispatch({
                type: 'UPDATE_HABIT',
                payload: res.data
            });
        });
};

export const loadHabits = () => dispatch => {
    getHabits()
        .then(res => {
            dispatch({
                type: 'LOAD_DATA',
                payload: {
                    data: res.data
                }
            });
            if (!store.getState().habits.selectedHabit) {
                const lowestPosition = Math.min(...res.data.map(habit => habit.positionOrder));
                const habitIdWithLowestPosition = res.data.filter(habit => habit.positionOrder === lowestPosition)[0].id;
                dispatch(selectHabit(habitIdWithLowestPosition));
            }
        });
};

export const loadLastCheckLog = () => dispatch => {
    getLastLogs()
        .then(res =>
            dispatch({
                type: 'LOAD_LAST_CHECK_LOG',
                payload: res.data
            })
        );
};

export const checkHabit = (habitId: number, date: string, check: HabitLogType) => dispatch => {
    setHabit(habitId, date, check)
        .then(res => dispatch({
                    type: 'CHECK_HABIT',
                    payload: {
                        log: res.data
                    }
                })
        ).then(() => loadLastCheckLog()(dispatch));
};

export const loadLogOfCurrentHabit = () => dispatch => {
    getLog(store.getState().habits.selectedHabit)
        .then(res =>
            dispatch({
                type: 'LOAD_LOG',
                payload: {
                    data: res.data
                }
            })
        );
};