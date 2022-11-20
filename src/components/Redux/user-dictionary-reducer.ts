export interface IDictionaryWord {
    word : string,
    mean : string,
    countOfExercise? : number,
}

interface IAction {
    type : string,
    payload? : {},
}

// const initState = null 

const initState = [
    {
        word : 'class',
        mean : 'класс',
        countOfExercise : 0,
    },
    {
        word : 'current',
        mean : 'текущий, действующий',
        countOfExercise : 0,
    }
]

export const userDictionaryReducer = (state: IDictionaryWord[] | null = initState, action: IAction) => {
    switch (action.type ){
        default:
            return state
    }
}