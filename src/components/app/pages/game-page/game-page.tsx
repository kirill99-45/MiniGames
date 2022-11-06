import { useState, useMemo, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { randomIntFromInterval } from '../../../hooks/hooks';

import { Header } from './header';
import { GameOver } from './game-over/game-over';
import { IconHelp } from '../../../icons/icons'

import { IResults, ICurrentOption, IHelper } from './interfaces';
import { getLevels } from './data';

import styles from './game-page.module.scss';


export const GamePage = () => {

  const operation = useLocation().state
  const { gameLevel } = useParams<{ gameLevel?: string }>()  
  const [gameOver, setGameOver] = useState<boolean>(false)

  const level = gameLevel ? +gameLevel : 1

  const [levels, setLevels] = useState(getLevels(operation, level))

  useMemo(() => {
    setLevels(getLevels(operation, level))
  }, [operation, level])

  const SCORE = 2;
  const SCORE_RATION = 1;

  const [currentLevel, setCurrentLevel] = useState<number>(0)

  const [result, setResult] = useState<IResults>({ levels : levels, correct: 0, scores: 0, inRow: 0 })

  const startAgain = () => {
    setLevels(getLevels(operation, level))
    setCurrentLevel(0)
    setGameOver(false)
    setTimerState(true)
    
  }

  useEffect(() => {
    setResult({ levels, correct: 0, inRow: 0, scores: 0 })
  }, [levels])

  const [helperState, setHelperState] = useState<IHelper>({countOfHelps : 3})

  const [timerState, setTimerState] = useState(true)
  const [duration, setDuration] = useState(0)

  const resultHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    if (parseInt(event.currentTarget.innerText) === levels[currentLevel].currentOption.correctResult) {
      setResult({
        levels: result.levels.map((item => item.level === currentLevel + 1 ? { ...item, result: true, isPlayed: true } : item)),
        correct: result.correct + 1,
        inRow: result.inRow + 1,
        scores: result.scores + (SCORE * (SCORE_RATION * result.inRow + 1))
      })
    } else {
      setResult({
        ...result,
        levels: result.levels.map((item => item.level === currentLevel + 1 ? { ...item, result: false, isPlayed: true } : item)),
        inRow: 0,
      })
    }
    if (currentLevel + 1 !== 10) {
      setCurrentLevel(currentLevel + 1)
    } else {
      setTimerState(false)
      setGameOver(true);
    }
  }

  const helperHandler = () => {
    if (helperState.countOfHelps > 0) {
      console.log(helperState.attempts?.filter(attempt => attempt.level !== currentLevel + 1))
      setHelperState({
        ...helperState,
        countOfHelps : helperState.countOfHelps - 1,
        attempts : helperState.attempts ? [...helperState.attempts, levels[currentLevel]] : [levels[currentLevel]],
      })
    }
  }

  console.log( levels[currentLevel]);
  

  return (
    <div className={styles.wrapper}>
      <div className={styles.sidebar}>
        <div className={styles.help} onClick={helperHandler}>
            <img src={IconHelp} className={styles.icon}/>
          </div>
        <div className={styles.promts}>
          <span>Количество подсказок:</span>
          <span>3</span>
        </div>
      </div>
      <div className={styles.app}>
        {gameOver && <GameOver correct={result.correct} startAgain={startAgain} scores={result.scores} duration={duration} />}
        <Header
          levels={result.levels}
          currentLevel={currentLevel}
          setCurrentLevel={setCurrentLevel}
          setGameOver={setGameOver}
          timerState={timerState}
          setTimerState={setTimerState}
          setDuration={setDuration}
        />
        <main className={styles.main}>
          <div className={styles.option}>{levels[currentLevel].currentOption.option}</div>
          <div className={styles.option}>{operation}</div>
          <div className={styles.option}>{level}</div>
          <div className={styles.option}>=</div>
          <div className={styles.option}>?</div>
        </main>
        <footer className={styles.footer}>
          {levels[currentLevel].answers.map(item => {
            return <div className={styles.option} onClick={resultHandler}>{item}</div>
          })}
        </footer>
      </div>
    </div>
  )
}
