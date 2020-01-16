export const removeItem = (itemType, id) => ({
  type: 'REMOVE_ITEM',
  payload: {
    itemType,
    id,
  },
});

export const loadData = (data: any[]) => ({
    type: 'LOAD_DATA',
    payload: {
        data
    }
});

export const selectHabit = (id: number) => ({
    type: 'SELECT_HABIT',
    payload: {
        id
    }
});