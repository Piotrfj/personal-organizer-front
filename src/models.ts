import {HabitLogType} from "./model-enum";

export interface Habit {

}

export interface HabitItem {
    id: number,
    content: string,
}

export  interface HabitLog {
    id: number
    habitId: number
    date: string
    checkedAtTime: string
    checkType: HabitLogType
}