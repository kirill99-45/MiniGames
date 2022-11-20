import MathGameIcon from '../../icons/Math-game/math-game.png';
import TechEnglish from '../../icons/Math-game/tech-english.png';

export interface IGame {
    title: string,
    link: string,
    img: string,
    score: number,
}

export const GAMES: IGame[] = [
    {
        title: 'Умножай, дели!',
        link: '/math-game',
        img: MathGameIcon,
        score: 5,
    },
    {
        title: 'Умножай, дели!',
        link: '/math-game',
        img: MathGameIcon,
        score: 3,
    },
    {
        title: 'Умножай, дели!',
        link: '/math-game',
        img: MathGameIcon,
        score: 1,
    },
    {
        title: 'Английский',
        link: '/tech-english',
        img: TechEnglish,
        score: 5,
    }
]