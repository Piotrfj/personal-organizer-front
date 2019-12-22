import axios from "axios";
import {apiUrl} from "../config";
import {HabitLogType} from "../model-enum";
import {HabitItem} from "../models";

export const getHabits = () => {
    return axios.get<HabitItem[]>(`${apiUrl}/habits`)
};

export const createHabit = (content: string) => {
    return axios.post(`${apiUrl}/habits`, {
        content
    })
};

export const getLog = () => {

};


export const checkHabit = (habitId: number, date: string, check: HabitLogType ) => {
    return axios.post(`${apiUrl}/log/${habitId}`, {
        date,
        check
    })
};