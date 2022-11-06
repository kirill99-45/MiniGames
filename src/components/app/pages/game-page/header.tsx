import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { ILevel } from './interfaces';

import { IconClose, IconCheck } from '../../../icons/icons';

import styles from './game-page.module.scss'


interface IProps {
  levels: ILevel[],
  currentLevel: number,
  setGameOver: Dispatch<SetStateAction<boolean>>,
  timerState: boolean,
  setTimerState: Dispatch<SetStateAction<boolean>>,
  setDuration: Dispatch<SetStateAction<number>>,
  setCurrentLevel: Dispatch<SetStateAction<number>>,
}

export const Header: React.FC<IProps> = ({ levels, currentLevel, setGameOver, timerState, setTimerState, setCurrentLevel }) => {


  const TIMER_DURATION = 60

  const [timer, setTimer] = useState<number>(TIMER_DURATION)
  const [timerScale, setTimerScale] = useState(-100)

  const TIMER_SCALE_RATION = +((100 / TIMER_DURATION).toFixed(2))

  //   useEffect(() => {
  //    if (timerState && timer > 0) {
  //      const startTimer = setInterval(() => {
  //        setTimer(timer - 1)
  //        setTimerScale(timerScale + TIMER_SCALE_RATION)
  //      }, 1000)

  //      return () => {
  //        clearInterval(startTimer)
  //      }
  //    } else {
  //        setGameOver(true)
  //        setTimer(TIMER_DURATION)
  //        setTimerState(false)
  //        setTimerScale(-100)
  //    }
  //  }, [timer, timerState])

  const getZero = (time: number): string => {
    return time > 9 ? `${time}` : `0${time}`
  }

  const getReadableTime = (time: number): string => {
    const minutes = Math.floor(time / 60)
    const seconds = time - (minutes * 60)
    return `${getZero(minutes)}:${getZero(seconds)}`
  }

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
                onClick={levelHandler}
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
