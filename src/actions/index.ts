export const loadData = (data: any[]) => {
    console.log(data);
    return ({
        type: 'LOAD_DATA',
        payload: {
            data
        }
    });
};

export const selectHabit = (id: number) => ({
    type: 'SELECT_HABIT',
    payload: {
        id
    }
});