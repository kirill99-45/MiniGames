import { changeAppSound, changeAppTheme } from '../Redux/actions';


export const soundHandler = () => {
    changeAppSound()
}

export const themeHandler = () => {
    changeAppTheme()
}

