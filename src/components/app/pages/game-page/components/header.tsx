import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { ILevel } from '../interfaces';

import { IconClose, IconCheck } from '../../../../icons/icons';

import styles from '../game-page.module.scss'
import { getReadableTime } from './sidebar/model';
import { LEVEL_DURATION } from '../constants';


interface IProps {
  levels: any[],
  currentLevel: number,
  timerState: boolean,
  setDuration: Dispatch<SetStateAction<number>>,
  setGameOver: Dispatch<SetStateAction<boolean>>,
  setTimerState: Dispatch<SetStateAction<boolean>>,
  setCurrentLevel: Dispatch<SetStateAction<number>>,
}

export const Header: React.FC<IProps> = ({ levels, currentLevel, timerState, setDuration, setGameOver, setTimerState, setCurrentLevel }) => {

  const [timer, setTimer] = useState<number>(LEVEL_DURATION)
  const [timerScale, setTimerScale] = useState(-100)

  const TIMER_SCALE_RATION = +((100 / LEVEL_DURATION).toFixed(2))

  //   useEffect(() => {
  //    if (timerState && timer > 0) {
  //      const startTimer = setInterval(() => {
  //        setDuration(prev => prev + 1)
  //        setTimer(timer - 1)
  //        setTimerScale(timerScale + TIMER_SCALE_RATION)
  //      }, 1000)

  //      return () => clearInterval(startTimer)
  //    } else {
  //        setGameOver(true)
  //        setTimer(LEVEL_DURATION)
  //        setTimerState(false)
  //        setTimerScale(-100)
  //    }
  //  }, [timer, timerState])

  const levelHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    const element = event.currentTarget.getAttribute('data-id')
    if (element) {
      setCurrentLevel(+element)
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.levels}>
        {
          levels.map((level, index) => {
            return (
              <div
                data-id={index}
                className={styles.level}
                style={{ background: !level.isPlayed ? (level.level === currentLevel + 1 ? '#fdd947' : '#dfdadaad') : (level.result ? '#52e952cc' : '#ed0a0ac4') }}
                onClick={!level.isPlayed ? levelHandler : () => ''}
              >
                {level.isPlayed && <img src={level.result ? IconCheck : IconClose} className={styles.result} />}
              </div>
            )
          })
        }
      </div>
      <div className={styles.timer}>
        <span>{`Осталось: ${getReadableTime(timer)}`}</span>
        <div className={styles.timer__state} style={{ translate: `${timerScale}%` }} />
      </div>
    </header>
  )
}
