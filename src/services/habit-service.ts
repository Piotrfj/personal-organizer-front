import axios from "axios";
import {apiUrl} from "../shared/config";
import {HabitLogType} from "../shared/model-enum";
import {HabitItem, HabitLog} from "../shared/models";
import localStorageService from "./localStorage-service";
import {logout} from "../redux/actions";
import store from "../redux/store";

axios.defaults.withCredentials = true;

axios.interceptors.response.use(res => res, error => {
    if (error.response.status === 401) {
        localStorageService.setUserId(null);
        store.dispatch(logout())
    }
    return Promise.reject(error);
});

export const logIn = (email: string, password: string) => {
    return axios.post(`${apiUrl}/login`, {
        email,
        password
    }).then(res => {
        if (res) {
            localStorageService.setUserId(res.data.id);
        }
        return res;
    });
};

export const createDemoAccount = () => {
    return axios.post(`${apiUrl}/demo`).then(res => {
        if (res) {
            localStorageService.setUserId(res.data.id);
        }
        return res;
    });
};

export const getHabits = () => {
    return axios.get<HabitItem[]>(`${apiUrl}/habits`);
};

export const createHabit = (content: string) => {
    return axios.post(`${apiUrl}/habits`, {
        content
    });
};

export const updateHabit = (id: number, content: string) => {
    return axios.put(`${apiUrl}/habits`, {
        id,
        content
    });
};

export const deleteHabit = (id: number) => {
    return axios.delete(`${apiUrl}/habits/${id}`);
};

export const swapHabitsPositions = (firstHabit: HabitItem, secondHabit: HabitItem) => {
    return axios.put(`${apiUrl}/habits/swap`, {
        firstHabit,
        secondHabit
    });
};

export const getLog = (habitId: number) => {
    return axios.get<HabitLog[]>(`${apiUrl}/log/${habitId}`);
};

export const setHabit = (habitId: number, date: string, check: HabitLogType) => {
    return axios.post(`${apiUrl}/log`, {
        habitId,
        date,
        check
    });
};

export const updateHabitLog = (id: number, habitId: number, date: string, check: HabitLogType) => {
    return axios.put(`${apiUrl}/log/${id}`, {
        habitId,
        date,
        check
    });
};

export const getLastLogs = () => {
  return axios.get(`${apiUrl}/log/last`)
};
