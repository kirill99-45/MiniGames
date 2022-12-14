import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';

import { Helper } from './helper';

import { IHelper, IResults } from '../../interfaces';

import { IconHome } from '../../../../../icons/icons';
import styles from './sidebar.module.scss';


interface IProps {
    helperState : IHelper,
    level : number,
    levels : any[],
    currentLevel : number,
    difficult: number,
    theme: string,
    setHelperState : Dispatch<SetStateAction<IHelper>>,
    setResult : Dispatch<SetStateAction<IResults>>,
}

export const Sidebar: React.FC<IProps> = ({ helperState, level, levels, currentLevel, difficult, theme, setHelperState, setResult }) => {


    return (
        <>
            <div className={styles[`sidebar-${theme}`]}>
                <Helper
                    helperState={helperState}
                    levels={levels}
                    currentLevel={currentLevel}
                    difficult={difficult}
                    setHelperState={setHelperState}
                    setResult={setResult}
                />
                <div className={styles[`level-game`]}>
                    <span>Текущий уровень:</span>
                    <span>{level}</span>
                </div>
                <Link className={styles.home} to='/math-game'>
                    <img src={IconHome} className={styles.icon} />
                </Link>
            </div>
        </>
    )
}