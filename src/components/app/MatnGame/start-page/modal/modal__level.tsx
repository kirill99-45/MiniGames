import React, { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';

import styles from './modal__level.module.scss';

import { IconCoin, IconClose } from '../../../../icons/icons';


interface IProps {
  difficult : number,
  theme : string,
  operation: string,
  setDifficult : Dispatch<SetStateAction<number>>,
  setIsChooseLevelModal: Dispatch<SetStateAction<boolean>>,
}

export const ModalChooseLevel: React.FC<IProps> = ({  difficult, theme, operation, setDifficult,  setIsChooseLevelModal, }) => {

  const COUNT_OF_GAME_LEVELS: number = 10

  const levels = new Array(COUNT_OF_GAME_LEVELS).fill(null).map((_, index) => index + 1)


  const DIFFICULTIES = [{ difficult: 1, title: 'Легкий' }, { difficult: 2, title: 'Средний' }, { difficult: 3, title: 'Тяжелый' }]

  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    const difficult = event.currentTarget.getAttribute('data-difficult')

    if (difficult) {
      setDifficult(+difficult)
    }
  }

  return (
    <div className={styles[`layout-${theme}`]}>
      <div className={styles.wrapper}>
        <img src={IconClose} className={styles.close} onClick={() => setIsChooseLevelModal(false)} />
        <div className={styles.levels}>
          {
            levels.map(level => {
              return (
                <Link className={styles.level} data-level={level} to={`${level}`} state={{ operation, difficult }}>
                  <img src={IconCoin} className={styles.icon} />
                </Link>
              )
            })
          }
        </div>
        <div className={styles.difficulty}>
          {
            DIFFICULTIES.map(item => {
              return (
                <div className={styles['difficulty-level']}>
                  <button
                    className={item.difficult === difficult ? styles['difficulty-button-active'] : styles['difficulty-button']}
                    data-difficult={item.difficult}
                    onClick={buttonHandler}
                  >
                    {item.title}
                  </button>
                  <div className={styles['difficulty-circle']} style={{ background: item.difficult === difficult ? '#15475c' : 'white' }} />
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}
