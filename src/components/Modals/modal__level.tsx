import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';

import styles from './modal__level.module.scss';

import IconCoin from '../icons/coin.png';
import IconCLose from '../icons/close.png';


interface IProps {
  setIsChooseLevelModal : Dispatch<SetStateAction<boolean>>,
  operation : string,
}

export const ModalChooseLevel: React.FC<IProps> = ({ setIsChooseLevelModal, operation }) => {

  const levels = new Array(9).fill(null).map((_, index) => index + 1)

  return (
    <div className={styles.wrapper}>
      <img src={IconCLose} className={styles.close} onClick={() => setIsChooseLevelModal(false)}/>
      {
        levels.map(level => {
          return (
            <Link className={styles.level} data-level={level} to={`game/${level}`} state={operation}>
              <img src={IconCoin} className={styles.icon}/>
            </Link>
          )
        })
      }
    </div>
  )
}
