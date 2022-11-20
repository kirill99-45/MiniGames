import { GAMES } from './home-page__model';

import { GameCard } from "./GameCard/game-card";

import styles from './home-page.module.scss';


export const HomePage = () => {

    return (
        <div className={styles.wrapper}>
            <h1>HOME PAGE</h1>
            <div className={styles.content}>
                { GAMES.map(game => <GameCard game={game}/>) }
            </div>
        </div>
    )
}