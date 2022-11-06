import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { randomIntFromInterval } from '../../../hooks/hooks';

import { Header } from './header';
import { GameOver } from './game-over/game-over';
import { IResults, ICurrentOption } from './interfaces';

import styles from './game-page.module.scss';


export const GamePage = () => {

  const operation  = useLocation().state
  const { gameLevel } = useParams<{ gameLevel? : string }>()

  const level = gameLevel ? +gameLevel : 1

  const MIN = operation === '*' ? 1 : level
  const MAX = operation === '*' ? 10 : 100

  const SCORE = 2;
  const SCORE_RATION = 1;

  const LEVELS = new Array(10).fill(null).map((_, index) => {
    return { level : index + 1, result : false, isPlayed : false }
  })

  const numbers: number[] = new Array(MAX).fill(0).map((_, index) => ((index + 1) % level === 0) ? index + 1 : 0).filter(item => item !== 0)

  const [currentlevel, setCurrentLevel] = useState<number>(1)

  const [currentOption, setCurrentOption] = useState<ICurrentOption>({
    option : operation === '*' ? randomIntFromInterval(MIN, MAX) : numbers[randomIntFromInterval(0, numbers.length - 1)],
    index : randomIntFromInterval(0, 4)
  })

  const [result, setResult] = useState<IResults>({ levels : LEVELS, correct: 0, scores : 0, inRow : 0 })

  const [gameOver, setGameOver] = useState<boolean>(false)

  const startAgain = () => {
    setResult({ levels : LEVELS, correct: 0, inRow : 0, scores : 0 })
    setCurrentOption({ option : randomIntFromInterval(MIN, MAX), index : randomIntFromInterval(0, 4) })
    setCurrentLevel(1)
    setGameOver(false)
    setTimerState(true)
  }

  const correctResult = operation === '*' ? currentOption.option * level : currentOption.option  / level

  const answers = new Array(5).fill(null).map((item, index) => {
    if (index === currentOption.index) return correctResult
    return (randomIntFromInterval(MIN, MAX) + randomIntFromInterval(MIN, MAX))
  })

  const [timerState, setTimerState] = useState(true)
  const [duration, setDuration] = useState(0)

  const resultHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    if (parseInt(event.currentTarget.innerText ) === correctResult) {
      setResult({
        levels : result.levels.map((item => item.level === currentlevel ? { ...item, result : true, isPlayed : true } : item)),
        correct : result.correct + 1,
        inRow : result.inRow + 1,
        scores : result.scores + (SCORE * (SCORE_RATION * result.inRow + 1))
      })
    } else {
      setResult({
        ...result,
        levels : result.levels.map((item => item.level === currentlevel ? { ...item, result : false, isPlayed : true } : item)),
        inRow : 0,
      })
    }
    if (currentlevel !== 10) {
      setCurrentLevel(currentlevel + 1)
    } else {
      setTimerState(false)
      setGameOver(true);
    }
  }

  useEffect(() => {
      setCurrentOption({
        option : operation === '*' ? randomIntFromInterval(MIN, MAX) : numbers[randomIntFromInterval(0, numbers.length - 1)],
        index : randomIntFromInterval(0, 4),
      })
  }, [currentlevel])


  return (
    <div className={styles.wrapper}>
      { gameOver && <GameOver correct={result.correct} startAgain={startAgain} scores={result.scores} duration={duration}/> }
      <Header
        levels={result.levels}
        currentlevel={currentlevel}
        setGameOver={setGameOver}
        timerState={timerState}
        setTimerState={setTimerState}
        setDuration={setDuration}
      />
      <main className={styles.main}>
        <div className={styles.option}>{currentOption.option}</div>
        <div className={styles.option}>{operation}</div>
        <div className={styles.option}>{level}</div>
        <div className={styles.option}>=</div>
        <div className={styles.option}>?</div>
      </main>
      <footer className={styles.footer}>
        { answers.map(item => <div className={styles.option} onClick={resultHandler}>{item}</div>) }
      </footer>
    </div>
  )
}
