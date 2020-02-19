import { ApplicationStateTypes } from '../types';
import localStorageService from "../../services/localStorage-service";

interface initialStateInterface {
    isLoadingModalOpen: boolean
    isLoggedIn: boolean
}

const initialState: initialStateInterface = {
    isLoadingModalOpen: !localStorageService.getUserId(),
    isLoggedIn: !!localStorageService.getUserId(),
};

interface AppAction {
    type: ApplicationStateTypes,
    payload: any,
}

const appReducer = (state = initialState, action: AppAction) => {
    switch (action.type) {
        case ApplicationStateTypes.CHANGE_MODAL_STATE:
            return {
                ...state,
                isLoadingModalOpen: action.payload
            };
        case ApplicationStateTypes.LOGIN_STATE:
            return {
                ...state,
                isLoadingModalOpen: !action.payload,
                isLoggedIn: action.payload,
            };
        default:
            return state;
    }
};

export default appReducer;
