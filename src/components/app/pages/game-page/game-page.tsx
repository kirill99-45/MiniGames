import { useState, useMemo, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';

import { Sidebar } from './components/sidebar/sidebar';
import { Header } from './components/header';
import { GameOver } from './components/game-over/game-over';

import { IHelper } from './interfaces';

import { COUNT_OF_HELPS, DURATION_IN_ROW } from './constants';

import styles from './game-page.module.scss';

import { gotTheWrongAnswer, gotTheCorrectAnswer, getLevels, getUnplayedLevel, getSoundForLevelResult, getSoundForGameResult } from './model';
import { InRow } from './components/InRow';


export const GamePage = () => {

  const operation = useLocation().state.operation
  const difficult = useLocation().state.difficult

  const { gameLevel } = useParams<{ gameLevel?: string }>()
  const [gameOver, setGameOver] = useState<boolean>(false)

  const level = gameLevel ? +gameLevel : 1

  const [levels, setLevels] = useState(getLevels(operation, level, difficult))
  const [counterPlayedLevels, setCounterPlayedLevels] = useState<number>(0)
  const [helperState, setHelperState] = useState<IHelper>({ countOfHelps: COUNT_OF_HELPS })

  const [currentLevel, setCurrentLevel] = useState<number>(0)

  const [isInRow, setIsInRow] = useState<boolean>(false)
  const [inRowTimer, setInRowTimer] = useState<number>(DURATION_IN_ROW)

  const [result, setResult] = useState({ levels: levels, correct: 0, scores: 0, inRow: 0 })
  const [timerState, setTimerState] = useState(true)

  const [duration, setDuration] = useState(0)

  const startAgain = () => {
    setLevels(getLevels(operation, level, difficult))
    setCurrentLevel(0)
    setGameOver(false)
    setTimerState(true)
    setHelperState({ countOfHelps: COUNT_OF_HELPS })
    setCounterPlayedLevels(0)
  }


  const resultHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    const LevelResult = parseInt(event.currentTarget.innerText) === levels[currentLevel].currentOption.correctResult

    setCounterPlayedLevels(prev => prev + 1)
    
    getSoundForLevelResult(LevelResult)

    if (LevelResult) {
      setResult(prev => gotTheCorrectAnswer(prev, currentLevel))

      if (result.inRow === 1 || result.inRow === 5 || result.inRow === 8) {
        setIsInRow(prev => prev ? prev : !prev)
      }
    } else {
      setResult(prev => gotTheWrongAnswer(prev, currentLevel))
      setIsInRow(false)
    }

    if (counterPlayedLevels + 1 < levels.length) {
      const nextLevel = getUnplayedLevel(result.levels, currentLevel)
      if (nextLevel !== null) setCurrentLevel(nextLevel)
    } else {
      getSoundForGameResult(result.correct)
      setTimerState(false)
      setGameOver(true);
    }
  }

  useEffect(() => {
    if (isInRow && inRowTimer > 0) {
      const timer = setInterval(() => {
        setInRowTimer(prev => prev - 100)
      }, 100)

      return () => clearInterval(timer)
    } else {
      setIsInRow(false)
      setInRowTimer(DURATION_IN_ROW)
    }

  }, [inRowTimer, isInRow])

  useEffect(() => {
    setResult({ levels: levels, correct: 0, inRow: 0, scores: 0 })
  }, [levels])

  useMemo(() => {
    setLevels(getLevels(operation, level, difficult))
  }, [operation, level])

  return (
    <div className={styles.wrapper}>
      <Sidebar
        helperState={helperState}
        level={level}
        levels={result.levels}
        currentLevel={currentLevel}
        difficult={difficult}
        setHelperState={setHelperState}
        setResult={setResult}
      />
      <div className={styles.app}>
        {
          gameOver &&
          <GameOver
            correct={result.correct}
            duration={duration}
            level={level}
            scores={result.scores}
            operation={operation}
            difficult={difficult}
            startAgain={startAgain}
          />
        }
        {isInRow && <InRow inRow={result.inRow} />}
        <Header
          levels={result.levels}
          currentLevel={currentLevel}
          timerState={timerState}
          setDuration={setDuration}
          setCurrentLevel={setCurrentLevel}
          setGameOver={setGameOver}
          setTimerState={setTimerState}
        />
        <main className={styles.main}>
          <div className={styles.option}>{levels[currentLevel].currentOption.option}</div>
          <div className={styles.option}>{operation}</div>
          <div className={styles.option}>{level}</div>
          <div className={styles.option}>=</div>
          <div className={styles.option}>?</div>
        </main>
        <footer className={styles.footer}>
          {result.levels[currentLevel].answers.map(item => {
            return (
              <div
                className={item.isHidden ? styles.option_hidden : styles.option}
                onClick={!item.isHidden ? resultHandler : () => ''}
              >
                {item.answer}
              </div>
            )
          })}
        </footer>
      </div>
    </div>
  )
}
