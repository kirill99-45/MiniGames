import { combineReducers } from "redux";

import { mainSettingsReducer } from './main-settings-reducer';

export const rootReducer = combineReducers({
    mainSettingsReducer,
})