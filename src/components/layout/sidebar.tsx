import { useSelector, useDispatch } from 'react-redux';

import { changeAppSound, changeAppTheme } from '../Redux/actions';

import styles from './style.module.scss';


export const Sidebar = () => {

    const settings = useSelector((state: any) => state.mainSettingsReducer)
    const dispatch = useDispatch()


    const getIcon = (param: string) => {
        return settings[param].icon
    }

    const soundHandler = () => {
        dispatch(changeAppSound())
    }
    
    const themeHandler = () => {
        dispatch(changeAppTheme())
    }
    

    return (
        <div className={styles.sidebar}>
            <button className={styles.button} >
                <img src={getIcon('sound')} onClick={soundHandler} />
            </button>
            <button className={styles.button}>
                <img src={getIcon('theme')} onClick={themeHandler} />
            </button>
        </div>
    )
}