import {HabitLogType} from "./model-enum";

export interface Habit {

}

export  interface HabitLog {
    id: number
    habitId: number
    date: string
    checkedAtTime: string
    checkType: HabitLogType
}