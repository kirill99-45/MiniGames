import { getCountOfAnswers, COUNT_OF_HIDDEN_ANSWERS } from '../../constants';

import { randomIntFromInterval } from '../../../../../hooks/hooks';
import { IAnswer, ICash, IHelper, IResults } from '../../interfaces';


const hideAnswers = (obj: ICash, indexResult: number, arr: number[] = [], countOfHiddenAnswers: number, max: number): number[] => {
    const index = randomIntFromInterval(0, max)
    if (index !== indexResult && arr.length !== countOfHiddenAnswers && !obj[index]) {
        arr.push(index)
        obj[index] = index
    }
    if (arr.length === countOfHiddenAnswers) {
        return arr
    }
    else {
        return hideAnswers(obj, indexResult, arr, countOfHiddenAnswers, max)
    }
}

export const getHelperState = (prev: IHelper, levels: any[], currentLevel: number) => {
    return {
        ...prev,
        countOfHelps: prev.countOfHelps - 1,
        attempts: prev.attempts ? [...prev.attempts, levels[currentLevel]] : [levels[currentLevel]],
    }
}

export const getResult = (prev: IResults, levels: any[], currentLevel: number, difficult: number) => {
    return {
        ...prev,
        levels: prev.levels.map(level => {
            if (level.level !== currentLevel + 1) return level
            const hiddenAnswers = hideAnswers({}, level.currentOption.index, [], COUNT_OF_HIDDEN_ANSWERS, getCountOfAnswers(difficult - 1))
            return {
                ...level,
                answers: level.answers.map((item: IAnswer, index: number) => {
                    if (hiddenAnswers.includes(index)) {
                        return { answer: item.answer, isHidden: true }
                    }
                    return item
                })
            }
        })
    }
}

const getZero = (time: number): string => time > 9 ? `${time}` : `0${time}`

export const getReadableTime = (time: number): string => {
    const minutes = Math.floor(time / 60)
    const seconds = time - (minutes * 60)
    return `${getZero(minutes)}:${getZero(seconds)}`
}
