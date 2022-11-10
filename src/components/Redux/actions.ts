import { CHANGE_APP_SOUND, CHANGE_APP_THEME } from './types';
 
export const changeAppSound = () => {
    return {
        type: CHANGE_APP_SOUND,
    }
}

export const changeAppTheme = () => {
    return {
        type : CHANGE_APP_THEME,
    }
}