import {HabitLogType} from "./model-enum";

export interface HabitItem {
    id: number,
    content: string,
    positionOrder: number,
}

export  interface HabitLog {
    id: number
    habitId: number
    date: string
    checkedAtTime: string
    checkType: HabitLogType
}