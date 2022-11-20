import { combineReducers } from "redux";

import { mainSettingsReducer } from './main-settings-reducer';
import { userDictionaryReducer } from './user-dictionary-reducer'

export const rootReducer = combineReducers({
    mainSettingsReducer,
    userDictionaryReducer,
})