const rootReducer = (state = {}, action) => {
  switch (action.type) {
    case 'REMOVE_ITEM':
      console.log('works');
      console.log(action);
      break;
    default:
      return state;
  }
};

const habitInitialState = {
  habits: []
};

export const habitReducer = (state = habitInitialState, action) => {
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

export default rootReducer;