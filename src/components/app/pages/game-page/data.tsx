import { randomIntFromInterval } from '../../../hooks/hooks';

const COUNT_OF_LEVELS = 10
const COUNT_OF_ANSWERS = 5

const getCurrentOption = (operation: string, level: number, min: number, max: number, numbers: number[]) => {
    const option = operation === '*' ? randomIntFromInterval(min, max) : numbers[randomIntFromInterval(0, numbers.length - 1)]
    const index = randomIntFromInterval(0, 4)
    const correctResult = operation === '*' ? option * level : option / level
    return { option, index, correctResult }
}

export const getLevels = (operation: string, gameLevel: number) => {
    const level = gameLevel ? +gameLevel : 1

    const MIN = operation === '*' ? 1 : level
    const MAX = operation === '*' ? 10 : 100

    const numbers: number[] = new Array(MAX).fill(0).map((_, index) => ((index + 1) % level === 0) ? index + 1 : 0).filter(item => item !== 0)

    return new Array(COUNT_OF_LEVELS).fill(0).map((_, i) => {
        const { option, index, correctResult } = getCurrentOption(operation, level, MIN, MAX, numbers) 
    
        return {
            level: i + 1,
            currentOption: { option, index, correctResult },
            answers: new Array(COUNT_OF_ANSWERS).fill(0).map((_, item_index) => {
                if (item_index === index) return correctResult
                return operation === '*' ? randomIntFromInterval(MIN, MAX) : numbers[randomIntFromInterval(0, numbers.length - 1)]
            }),
            result : false,
            isPlayed : false,
        }
    })
    
}


