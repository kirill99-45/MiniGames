import { randomIntFromInterval } from "../../../../hooks/randomIntFromInterval"
import { IDictionaryWord } from "../../../../Redux/user-dictionary-reducer"
// import { WORDS } from "./WORDS"

const COUNT_OF_WORDS = 1

const isUserKnowWord = (userDictionary: IDictionaryWord[], result: IDictionaryWord[]): IDictionaryWord => {
    const randomWord = userDictionary[randomIntFromInterval(0, userDictionary.length - 1)]

    for (let i = 0; i < result.length; i++) {
        const currentWord = result[i]
        if (currentWord === randomWord) {
            return isUserKnowWord(userDictionary, result)
        }
    }
    return randomWord
}

export interface IlevelWords extends IDictionaryWord {
    isFirstLevel : boolean,
    isSecondLevel : boolean,
}

export const createLevel = (userDictionary: IDictionaryWord[]):IDictionaryWord[] => {
    const result: IlevelWords[] = []

    new Array(COUNT_OF_WORDS).fill(null).map(item => {
        const word = isUserKnowWord(userDictionary, result)
        result.push({...word, isFirstLevel : true, isSecondLevel : false })
    })
    return result
}