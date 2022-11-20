import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { IconHelp } from '../../../icons/icons';

import { Examples } from './examples';
import { FirstLevel } from './FirstLevel/FirstLevel';
import { SecondLevel } from './SecondLevel/second-level';

import { createLevel } from './Model/create-level';

import styles from './words-page.module.scss';

export const WordsPage: React.FC = () => {

    const userDictionary = useSelector((state: any) => state.userDictionaryReducer)

    const [levels, setLevels] = useState<any[]>(createLevel(userDictionary))

    const [currentIndexLevel, setCurrentIndexLevel] = useState(0)

    const currentLevel = levels[currentIndexLevel]

    return (
        <div className={styles.wrapper}>
            <header>выберите правильный вариант слова</header>
            <main>
                <div className={styles.practice__title}>
                    <span>{currentLevel.mean}</span>
                    <div className={styles['icon-wrapper']}>
                        <img src={IconHelp} title='Подсказка' alt='Иконка подсказки' />
                    </div>
                </div>
                { currentLevel.isFirstLevel ? <FirstLevel word={currentLevel.word}/> : <SecondLevel findWord={currentLevel.word}/> }
            </main>
            {/* {currentIndex === word.length && <Examples />} */}
        </div>
    )
}