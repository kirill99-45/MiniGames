import { SCORE, SCORE_RATIO, COUNT_OF_LEVELS, getCountOfAnswers } from "./constants"

import { randomIntFromInterval } from '../../../hooks/hooks';

import { WRONG_ANSWER, CORRECT_ANSWER, WIN_GAME, LOSE_GAME } from "../../../UI/sounds";

import { IResults } from "./interfaces"


const getCurrentOption = (operation: string, level: number, min: number, max: number, numbers: number[]) => {
    const option = operation === '*' ? randomIntFromInterval(min, max) : numbers[randomIntFromInterval(0, numbers.length - 1)]
    const index = randomIntFromInterval(0, 4)
    const correctResult = operation === '*' ? option * level : option / level
    return { option, index, correctResult }
}

export const getLevels = (operation: string, gameLevel: number, difficult: number) => {
    const level = gameLevel ? +gameLevel : 1

    const MIN = operation === '*' ? 1 : level
    const MAX = operation === '*' ? 10 : 100

    const numbers: number[] = new Array(MAX).fill(0).map((_, index) => ((index + 1) % level === 0) ? index + 1 : 0).filter(item => item !== 0)

    return new Array(COUNT_OF_LEVELS).fill(0).map((_, i) => {
        const { option, index, correctResult } = getCurrentOption(operation, level, MIN, MAX, numbers)

        return {
            level: i + 1,
            currentOption: { option, index, correctResult },
            answers: new Array(getCountOfAnswers(difficult)).fill(0).map((_, item_index) => {
                if (item_index === index) return { answer: correctResult, isHidden: false }
                return {
                    isHidden: false,
                    answer: operation === '*' ? randomIntFromInterval(MIN, MAX) : numbers[randomIntFromInterval(0, numbers.length - 1)]
                }
            }),
            result: false,
            isPlayed: false,
        }
    })

}

export const gotTheCorrectAnswer = (prev: IResults, currentLevel: number) => {
    return {
        levels: prev.levels.map((item => item.level === currentLevel + 1 ? { ...item, result: true, isPlayed: true } : item)),
        correct: prev.correct + 1,
        inRow: prev.inRow + 1,
        scores: prev.scores + (SCORE * (SCORE_RATIO * prev.inRow + 1))
    }
}

export const gotTheWrongAnswer = (prev: IResults, currentLevel: number) => {
    return {
        ...prev,
        levels: prev.levels.map((item => item.level === currentLevel + 1 ? { ...item, result: false, isPlayed: true } : item)),
        inRow: 0,
    }
}

export const getUnplayedLevel = (levels: any[], currentLevel: number): number | null => {
    if (levels[currentLevel + 1] && !levels[currentLevel + 1].isPlayed) return currentLevel + 1

    const unPlayedLevels = levels.filter(level => !level.isPlayed)
    return unPlayedLevels ? unPlayedLevels[0].level - 1 : null
}


export const getSoundForLevelResult = (result: boolean) => {
    if (result) {
        new Audio(CORRECT_ANSWER).play()
    }
    else {
        new Audio(WRONG_ANSWER).play()
    }
}

export const getSoundForGameResult = (result: number) => {
    if (((result / 10) * 100) > 60) {
        new Audio(WIN_GAME).play()
    }
    else {
        new Audio(LOSE_GAME).play()
    }
}
