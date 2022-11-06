import { useState } from 'react';
import { Link } from 'react-router-dom';
import { randomIntFromInterval } from '../../../hooks/hooks';

import styles from './start-page.module.scss';

import IconMembership from '../../../icons/crown.png';
import { ModalChooseLevel } from '../../../Modals/modal__level'


export const StartPage = () => {

  const [isChooseLevelModal, setIsChooseLevelModal] = useState<boolean>(false)
  const [operation, setOperation] = useState<string>('*')

  return (
    <>
      { isChooseLevelModal && <ModalChooseLevel setIsChooseLevelModal={setIsChooseLevelModal} operation={operation}/> }
      <div className={styles.wrapper}>
        <main className={styles.main}>
          <div className={styles.level__types}>
            <h2>Умножение</h2>
            <span className={styles.level__options} onClick={() => { setIsChooseLevelModal(true); setOperation('*') }}>Выбор уровня</span>
            <Link to={`/game/${randomIntFromInterval(1, 10)}`} className={styles.level__options} state='*'>Тренировка</Link>
          </div>
          <div className={styles.level__types}>
            <h2>
              Деление
              <img src={IconMembership}/>
            </h2>
            <span className={styles.level__options} onClick={() => { setIsChooseLevelModal(true); setOperation('/') }}>Выбор уровня</span>
            <Link to={`/game/${randomIntFromInterval(1, 10)}`} className={styles.level__options} state='/'>Тренировка</Link>
          </div>
        </main>
      </div>
    </>
  )
}
