import { useSelector, useDispatch } from 'react-redux';

import { IMainSettingsReducer } from '../Redux/main-settings-reducer';

import { MAIN_SETTINGS } from '../icons/settings';

import styles from './style.module.scss';


export const Sidebar = () => {

    const settings = useSelector((state: any) => state.mainSettingsReducer)

    console.log(MAIN_SETTINGS);

    return (
        <div className={styles.sidebar}>
            <button className={styles.button}>
                <img src={MAIN_SETTINGS.themes[0]} />

            </button>
            <button className={styles.button}>
                <img src={MAIN_SETTINGS.sounds[0]} />
            </button>
        </div>
    )
}