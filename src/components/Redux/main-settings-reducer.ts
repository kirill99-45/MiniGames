import { CHANGE_APP_SOUND, CHANGE_APP_THEME } from './types';

import { MAIN_SETTINGS } from '../icons/icons';


const { themes, sounds } = MAIN_SETTINGS;

interface ISound {
    isSound : boolean,
    icon : string,
}

interface ITheme {
    isLight : boolean,
    icon : string,
}

interface IInitState {
    sound : ISound,
    theme : ITheme,
    volume : number,
}

interface IAction {
    type : string,
}

const initState: IInitState = {
    sound : {
        isSound : true,
        icon : sounds.sound,
    },
    theme : {
        isLight : true,
        icon : themes.light,
    },
    volume : 1,
}

export interface IMainSettingsReducer {
    state : IInitState,
    action : IAction,
}

export const mainSettingsReducer = (state: IInitState = initState, action: IAction) => {
    switch(action.type) {
        case CHANGE_APP_SOUND: {
            return {
                ...state,
                sound : {
                    isSound : !state.sound.isSound,
                    icon : state.sound.isSound ?  sounds.mute : sounds.sound,
                }
            }
        }
        case CHANGE_APP_THEME: {
            return {
                ...state,
                theme : {
                    isLight : !state.theme.isLight,
                    icon : !state.theme.isLight ? themes.light : themes.dark,
                }
            }
        }

        default:
            return state
    }
}