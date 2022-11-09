export const SCORE: number = 2;
export const SCORE_RATIO: number = 1;

export const COUNT_OF_HELPS: number = 3;

export const COUNT_OF_LEVELS: number = 10;

const COUNT_OF_ANSWERS = <{ [key : number]: number }>{
    1 : 5,
    2 : 7,
    3 : 10
}

export const getCountOfAnswers = (difficult: number) => {
    return COUNT_OF_ANSWERS[difficult]
}

export const LEVEL_DURATION = 60;

export const COUNT_OF_HIDDEN_ANSWERS: number = 2

export const DURATION_IN_ROW = 500;