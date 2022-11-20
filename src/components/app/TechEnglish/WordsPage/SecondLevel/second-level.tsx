import React, { useEffect, useMemo, useState } from 'react';

import { IDictionaryWord } from '../../../../Redux/user-dictionary-reducer';

import styles from './second-level.module.scss'

import { getRandomLettersQueue } from './second-level__model';

interface IProps {
    findWord : string,
}

export const SecondLevel: React.FC<IProps> = ({ findWord }) => {

    const TIMER_DURATION: number = 2;

    const [wrongAnswerTimer, setWrongAnswerTimer] = useState(false)
    const [wrongAnswerTimerDuration, setWrongAnswerTimerDuration] = useState<number>(TIMER_DURATION)

    const [word, setWord] = useState<Array<{ index: number, letter: string, active: boolean }>>([])

    const [currentIndex, setCurrentIndex] = useState<number>(0)

    const currentLetter = findWord[currentIndex]

    const [wrongAnswer, setWrongAnswer] = useState<null | number>(null)

    const getResult = (event: React.MouseEvent<HTMLLIElement>) => {
        const { currentTarget } = event
        if (!currentTarget) return
        if (currentTarget.innerText === currentLetter) {
            if (wrongAnswer !== null) { // Если был до этого был дан неверный ответ и таймер его отображения не истек, то нужно прервать таймер
                setWrongAnswer(null)
                setWrongAnswerTimer(false)
            }

            setCurrentIndex(prev => prev + 1)
            let isDeleted = false
            setWord(prev => {
                return prev.map(item => {
                    if (item.letter == currentTarget.innerText && !isDeleted && item.active) {
                        isDeleted = true
                        return {
                            ...item,
                            active: false,
                        }
                    } return item
                })
            })
        } else {
            setWrongAnswer(currentIndex)
            setWrongAnswerTimer(true)
        }
    }

    useEffect(() => {
        if (wrongAnswerTimer && wrongAnswerTimerDuration > 0) {
            const timer = setTimeout(() => {
                setWrongAnswerTimerDuration(prev => prev - 1)
            }, 1000)

            return () => clearTimeout(timer)
        } else {
            setWrongAnswer(null)
            setWrongAnswerTimer(false)
            setWrongAnswerTimerDuration(TIMER_DURATION)
        }
    }, [wrongAnswerTimer, wrongAnswerTimerDuration])

    useMemo(() => {
        setWord(getRandomLettersQueue(findWord))
    }, [findWord])

    return (
        <>
        <div className={styles['words-container']}>
            {
                findWord.split(' ').map(word => {
                    return (
                        <ul className={styles['letters-container']}>
                            {
                                word.split('').map((letter: string, index: number) => {
                                    return <li className={styles[wrongAnswer === index ? 'wrong' : '']}>{index < currentIndex ? letter : ''}</li>
                                })
                            }
                        </ul>
                    )
                })
            }
        </div>
        <ul className={styles['answer-container']}>
            {
                word.map(({ letter, index, active }) => {
                    return (
                        <li
                            className={styles[!active ? 'hidden' : '']}
                            key={index}
                            data-index={index}
                            onClick={(event) => getResult(event)}
                        >
                            {letter}
                        </li>
                    )
                })
            }
        </ul>
    </>
    )
}