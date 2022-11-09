import { Dispatch, SetStateAction } from 'react';
import { IconMembership } from '../icons/icons';

import styles from './style.module.scss';

interface IProps {
  sidebarState: boolean,
  setSidebarState: Dispatch<SetStateAction<boolean>>,
}

export const Header: React.FC<IProps> = ({ setSidebarState, sidebarState }) => {

  const photo = 'https://sun9-10.userapi.com/impg/R-MkoRP-pOt_BNNPLn5wMSnzCyrB0oWHo3f4OQ/GJM9Ar0lDMA.jpg?size=864x1080&quality=96&sign=141a66ac561501b6a62cebca86037ecc&type=album'

  return (
    <header className={styles.header}>
      <div className={styles.membership}>
        <img src={IconMembership} className={styles.header__icon} />
      </div>
      <div className={styles.user}>
        <div className={styles.user__data}>
          <span>Кирилл</span>
          <span>Рогов</span>
        </div>
        <img src={photo} className={styles.user__photo} />
        <img src={IconMembership} className={styles.user__membership} />
      </div>
    </header>
  )
}
