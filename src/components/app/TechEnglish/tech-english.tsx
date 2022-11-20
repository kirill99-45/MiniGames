import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';

import styles from './tech-english.module.scss';

export const TechEnglish = () => {

    return (
        <div className={styles.wrapper}>
            <h2>Слова</h2>
            <Link className={styles.card} to='words'>
                <FontAwesomeIcon icon={faDumbbell}/>
                <h3>Тренирова слов</h3>
                <span>Короткие интервальные повторения слов из вашего Словаря по алгоритму SuperMemo</span>
            </Link>
        </div>
    )
}