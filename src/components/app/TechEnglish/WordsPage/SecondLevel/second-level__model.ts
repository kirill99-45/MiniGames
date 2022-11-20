import { randomIntFromInterval } from '../../../../hooks/randomIntFromInterval';


const isIndexUsed = (arr: number[], max: number): number => {
    const currentIndex = randomIntFromInterval(0, max)

    if (arr.includes(currentIndex)) return isIndexUsed(arr, max)
    return currentIndex
}

export const getRandomLettersQueue = (str: string) => {
    const letters = str.split(' ').join('').split('')

    const stack: number[] = []

    return new Array(letters.length).fill(null).map(letter => {
        const index = isIndexUsed(stack, letters.length - 1)
        stack.push(index)
        return {
            index,
            letter: letters[index],
            active : true,
        }
    })
}