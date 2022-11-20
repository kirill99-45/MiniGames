import { randomIntFromInterval } from '../../../../hooks/randomIntFromInterval';

import { WORDS } from '../Model/WORDS';


const getRandomWord = (arr: string[] | [], correct: string): string => {
    const randomWord = WORDS[randomIntFromInterval(0, WORDS.length - 1)].word

    if (randomWord === correct) return getRandomWord(arr, correct)
    
    for (let i = 0; i < arr.length; i++) {
        const currentWord = arr[i]
        if (currentWord === randomWord) return getRandomWord(arr, correct)
    }
    return randomWord
}

export const getWrongAnswers = (answer: string) => {
    const result: string[] = []

    const indexCorrectAnswer = randomIntFromInterval(0, 3)

    new Array(4).fill(null).forEach((_, index) => {
        if (index === indexCorrectAnswer) {
            result.push(answer)
        }
        else {
            result.push(getRandomWord(result, answer))
        }
    })

    return result
}