import {
    createHabit,
    getHabits,
    getLastLogs,
    getLog,
    setHabit,
    swapHabitsPositions,
    updateHabit,
    deleteHabit as deleteHabitRequest, updateHabitLog, createDemoAccount, logIn
} from "../../services/habit-service";
import store from 'redux/store';
import {HabitLogType} from "../../shared/model-enum";
import {HabitActionTypes, ApplicationStateTypes} from "../types";
import {HabitItem} from "../../shared/models";
import {deepCloneObject} from "../../shared/utils";

export const turnOffLoginModal = () => ({
  type: ApplicationStateTypes.CHANGE_MODAL_STATE,
  payload: false
});

export const turnOnLoginModal = () => ({
  type: ApplicationStateTypes.CHANGE_MODAL_STATE,
  payload: true
});

export const login = (email, password) => dispatch => {
    logIn(email, password)
        .then(res => {
            dispatch({
                type: ApplicationStateTypes.LOGIN_STATE,
                payload: true,
            })
        })
};

export const logout = () => ({
    type: ApplicationStateTypes.LOGIN_STATE,
    payload: false
});

export const tryDemo = () => dispatch => {
    createDemoAccount()
        .then(res => {
            dispatch({
                type: ApplicationStateTypes.LOGIN_STATE,
                payload: true,
            })
        })
};

export const selectHabit = (id: number) => ({
    type: HabitActionTypes.SELECT_HABIT,
    payload: {
        id
    }
});

export const addHabit = (content: string) => dispatch => {
    createHabit(content)
        .then(res => {
            dispatch({
                type: HabitActionTypes.ADD_HABIT,
                payload: {
                    content: res.data
                }
            });
        });
};

export const editHabit = (id: number, content: string) => dispatch => {
    updateHabit(id, content)
        .then(res => {
            dispatch({
                type: HabitActionTypes.UPDATE_HABIT,
                payload: res.data
            });
        });
};

export const loadHabits = () => dispatch => {
    getHabits()
        .then(res => {
            dispatch({
                type: HabitActionTypes.LOAD_HABITS,
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
                type: HabitActionTypes.LOAD_LAST_CHECK_LOG,
                payload: res.data
            })
        );
};

export const checkHabit = (habitId: number, date: string, check: HabitLogType) => dispatch => {
    setHabit(habitId, date, check)
        .then(res => dispatch({
                    type: HabitActionTypes.CHECK_HABIT,
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
                type: HabitActionTypes.LOAD_LOG,
                payload: {
                    data: res.data
                }
            })
        );
};

export const swapHabits = (firstHabit: HabitItem, secondHabit: HabitItem) => dispatch => {
    swapHabitsPositions(firstHabit, secondHabit)
        .then(() =>
            dispatch({
                type: HabitActionTypes.SWAP_HABITS,
                payload: {
                    firstHabit: deepCloneObject(firstHabit),
                    secondHabit: deepCloneObject(secondHabit)
                }
            })
        );
};

export const deleteHabit = (id: number) => dispatch => {
    deleteHabitRequest(id)
        .then(() =>
            dispatch({
                type: HabitActionTypes.DELETE_HABIT,
                payload: id
            })
        );
};

export const updateLog = (id: number, habitId: number, date: string, check: HabitLogType) => dispatch => {
    updateHabitLog(id, habitId, date, check)
        .then(res =>
            dispatch({
                type: HabitActionTypes.UPDATE_LOG,
                payload: res.data
            })
        );
};
