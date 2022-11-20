import React, { useState } from "react";

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import styles from './game-card.module.scss';

import { IGame } from '../home-page__model';


export const GameCard: React.FC<{ game : IGame }> = ({ game }) => {

    const [scoreState, setScoreState] = useState<string>('score-icons')

    return (
        <div className={styles.game}>
        <Link to={game.link}>
            <h3>{game.title}</h3>
        </Link>
        <div className={styles['img-wrapper']}>
            <img src={game.img} />
        </div>
        <footer>
            <div className={styles.score} title='Оценить' onClick={() => setScoreState(scoreState === 'score-icons' ? 'set-score-icons' : 'score-icons')}> 
                <h4>Оценка: {game.score}</h4>
                <div className={styles[scoreState]}> 
                    {
                        new Array(5).fill(null).map((_, index) => {
                            if (scoreState === 'score-icons') {
                                return <FontAwesomeIcon icon={faStar} className={styles[index + 1 <= game.score ? 'score-icon-active' : 'score-icon']} />  
                            } return <FontAwesomeIcon icon={faStar} className={styles['score-icon']}/>
                        })
                    }
                </div>
            </div>
            <Link to={game.link}>Играть</Link>
        </footer>
    </div>
    )
}