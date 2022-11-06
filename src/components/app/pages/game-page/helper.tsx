import { useState } from 'react';

import { IconHelp } from '../../../icons/icons'

import styles from './game-page.module.scss';


export const Helper: React.FC = () => {

    const [helperState, setHelperState] = useState(false)

    return (
        <div className={styles.help}>
          <img src={IconHelp} className={styles.icon}/>
        </div>
    )
}