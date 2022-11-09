import { randomIntFromInterval } from "../../../../../hooks/hooks"

import { COUNT_OF_GAME_LEVELS } from '../../../start-page/start-page';

import { HEROS_LOSE, HEROS_WIN } from "../../../../../icons/icons";

const complimentsResult = {
    great: ['Блеск', 'Отлично', 'Потрясающе', 'Прекрасно'], // > 88 %
    good: ['Хорошо}', '', 'Удачно', 'Круто'], // > 65
    normally: ['Окей', 'Нормалёк', 'Сойдет'], /// > 50
    bad: ['Трудно', 'Тяжело', 'Повторим?', 'Закрепим?'] // < 50
}

export const getResultCompliment = (percent: number): string => {
    if (percent > 65) {
        return percent >= 88 ?
            complimentsResult.great[randomIntFromInterval(0, complimentsResult.great.length - 1)] :
            complimentsResult.good[randomIntFromInterval(0, complimentsResult.good.length - 1)]
    } else {
        return percent >= 50 ?
            complimentsResult.normally[randomIntFromInterval(0, complimentsResult.normally.length - 1)] :
            complimentsResult.bad[randomIntFromInterval(0, complimentsResult.bad.length - 1)]
    }
}

const complimentDuration = {
    great : 'Шустро',
    good : 'Быстро',
    normally : 'Приемлемо',
    bad : 'Ну такое',
}

export const getDurationCompliment = (percent: number): string => {
    if (percent < 40) {
        return percent <= 20 ?
            complimentDuration.great :
            complimentDuration.good
    } else {
        return percent <= 50 ?
            complimentDuration.normally :
            complimentDuration.bad
    }
}

export const isNextLevel = (level: number, correct: number): boolean => {
    return (((correct / 10) * 100) > 60) && level + 1 <= COUNT_OF_GAME_LEVELS ? true : false 

  }

export const getHero = (result: number): string => {
    return (((result / 10) * 100) > 60) ? HEROS_WIN[randomIntFromInterval(0, HEROS_WIN.length - 1)] : 
    HEROS_LOSE[randomIntFromInterval(0, HEROS_LOSE.length - 1)]
}