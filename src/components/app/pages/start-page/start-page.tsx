import { useState } from 'react';
import { Link } from 'react-router-dom';
import { randomIntFromInterval } from '../../../hooks/hooks';

import styles from './start-page.module.scss';

import { ModalChooseLevel } from '../../../Modals/modal__level'
import { IconMembership } from '../../../icons/icons';

export const COUNT_OF_GAME_LEVELS: number = 10

export const StartPage = () => {

  const [isChooseLevelModal, setIsChooseLevelModal] = useState<boolean>(false)
  const [difficult, setDifficult] = useState(1)
  const [operation, setOperation] = useState<string>('*')

  return (
    <>
      { isChooseLevelModal && 
        <ModalChooseLevel 
          difficult={difficult} 
          operation={operation} 
          setDifficult={setDifficult} 
          setIsChooseLevelModal={setIsChooseLevelModal}
        /> 
      }
      <div className={styles.wrapper}>
        <main className={styles.main}>
          <div className={styles.level__types}>
            <h2>Умножение</h2>
            <span className={styles.level__options} onClick={() => { setIsChooseLevelModal(true); setOperation('*') }}>Выбор уровня</span>
            <Link to={`/game/${randomIntFromInterval(1, 10)}`} className={styles.level__options} state={{ operation : '*', difficult : randomIntFromInterval(1, 3) }}>Тренировка</Link>
          </div>
          <div className={styles.level__types}>
            <h2>
              Деление
              <img src={IconMembership}/>
            </h2>
            <span className={styles.level__options} onClick={() => { setIsChooseLevelModal(true); setOperation('/') }}>Выбор уровня</span>
            <Link to={`/game/${randomIntFromInterval(1, 10)}`} className={styles.level__options} state={{ operation : '/', difficult : randomIntFromInterval(1, 3) }}>Тренировка</Link>
          </div>
        </main>
      </div>
    </>
  )
}
