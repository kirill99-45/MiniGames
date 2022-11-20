import React from 'react';
import styles from './first-level.module.scss';
import { getWrongAnswers } from './first-level__model';

interface IProps {
    word : string,
}

export const FirstLevel: React.FC<IProps> = ({ word }) => {

    const answers = getWrongAnswers(word)  
    
    const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
        const { currentTarget } = event
        if (!currentTarget) return

        
    }

    return (
        <ul>
            {
                answers.map((answer, index) => {
                    return (
                        <li 
                            key={index}
                            data-index={index + 1} 
                            className={styles[ answer === word ? '' : '' ]} 
                            onClick={(event) => handleClick(event)}
                        >
                            {answer}
                        </li>
                    )
                })
            }
        </ul>
    )
}