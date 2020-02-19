import { ApplicationStateTypes } from '../types';

interface initialStateInterface {
  isLoadingModalOpen: boolean
}

const initialState: initialStateInterface = {
  isLoadingModalOpen: true
};

interface AppAction {
  type: ApplicationStateTypes,
  payload: any,
}

const appReducer = (state = initialState, action: AppAction) => {
  switch(action.type) {
    case ApplicationStateTypes.CHANGE_MODAL_STATE:
      return {
        ...state,
        isLoadingModalOpen: action.payload
      };
    default:
      return state;
  }
};

export default appReducer;
