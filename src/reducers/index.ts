export const habitReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_DATA':
      return {
        ...state,
        habits: action.payload.data
      };
    case 'SELECT_HABIT':
      return {
        ...state,
        selectedHabit: action.payload.id
      };
    default:
      return state;
  }
};

const rootReducer = (state = habitInitialState, action) => {
  return habitReducer(state, action);
};

const habitInitialState = {
  habits: []
};

export default rootReducer;