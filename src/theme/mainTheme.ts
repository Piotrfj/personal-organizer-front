import { HabitLogType } from "../shared/model-enum";

export const theme = {
    appBgc: '#fff',
    habitSelectedBgc: '#eee',
    fontSize: {
        xxs: '1rem',
        xs: '1.2rem',
        s: '1.6rem',
        m: '2.1rem',
        l: '2.4rem',
        xl: '4rem',
    },
    cellType: {
        [HabitLogType.SUCCESS]: 'green',
        [HabitLogType.FAIL]: 'red',
        [HabitLogType.WARNING]: 'orange',
        [HabitLogType.DOESNT_COUNT]: 'dimgrey'
    },
    paletteBlue: {
        darker: '#19476d',
        dark: '#21547e',
        main: '#2f6189',
        secondary: '#3286c2',
        bright: '#3495da',
        bgc: '#222629',
        text1: '#474b4f',
        text2: '#6b6e70',
        text3: '#a6a8a9',
        text4: '#ccc',
    }
};
