import { Link } from 'react-router-dom';

import { IResults } from '../interfaces';

import styles from './game-over.module.scss';

interface IProps {
  correct : number,
  startAgain : () => void,
  scores : number,
  duration : number,
}

export const GameOver: React.FC<IProps> = ({ correct, startAgain, scores, duration }) => {

  return (
    <div className={styles.layout}>
      <div className={styles.game__over}>
        <img src='https://i.pinimg.com/originals/a3/a7/9a/a3a79abe13d3658b7f7ff860d8a43aa8.png' className={styles.image}/>
        <h1>Игра завершена!</h1>
        <div className={styles.footer}>
          <div className={styles.statistic}>
            <span>Вы получили {scores} очков</span>
            <span>Длительность уровня: {duration} сек</span>
            <span>Процент верных ответов: {(correct / 10) * 100}%</span>
          </div>
          <div className={styles.options}>
            <button type='button' onClick={startAgain} className={styles.button}>Заного</button>
            <Link to='/'>На главную</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
