import { Link } from 'react-router-dom';

import { getDurationCompliment, getResultCompliment, isNextLevel, getHero } from './model';

import styles from './game-over.module.scss';
import { IconExperience, IconFire, IconWatch } from '../../../../../icons/icons';

import { LEVEL_DURATION } from '../../constants';

interface IProps {
  correct: number,
  level: number,
  operation: string,
  scores: number,
  duration: number,
  difficult: number,
  startAgain: () => void,
}

export const GameOver: React.FC<IProps> = ({ correct, level, operation, scores, duration, difficult, startAgain }) => {


  return (
    <div className={styles.layout}>
      <div className={styles.game__over}>
        <img src={getHero(correct)} className={styles.image} alt='background'/>
        <h1>Игра завершена!</h1>
        <div className={styles.footer}>
          <div className={styles.statistic}>
            <div className={styles['statistic-box']} style={{ background: '#f1ff00' }}>
              <span className={styles.header}>Опыт</span>
              <div className={styles.main}>
                <img src={IconExperience} alt='icon' />
                <span>{scores}</span>
              </div>
            </div>
            <div className={styles['statistic-box']}>
              <span className={styles.header}>{getDurationCompliment((duration / LEVEL_DURATION) * 100)}</span>
              <div className={styles.main}>
                <img src={IconWatch} alt='icon' />
                <span>{duration} сек.</span>
              </div>
            </div>
            <div className={styles['statistic-box']} style={{ background: '#00ff08' }}>
              <span className={styles.header}>{getResultCompliment((correct / 10) * 100)}</span>
              <div className={styles.main}>
                <img src={IconFire} alt='icon' />
                <span>{(correct / 10) * 100}%</span>
              </div>
            </div>
          </div>
          <div className={styles.options}>
            <button type='button' onClick={startAgain} className={styles.button}>Повторить</button>
            <Link to='/'>На главную</Link>
            {isNextLevel(level, correct) && <Link to={`/game/${level + 1}`} state={{ operation, difficult }} onClick={startAgain}>Следующий уровень</Link>}
          </div>
        </div>
      </div>
    </div>
  )
}
