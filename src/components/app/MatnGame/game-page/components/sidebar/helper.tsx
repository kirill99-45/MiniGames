import { Dispatch, SetStateAction } from 'react';

import { IHelper, IResults, ICash, IAnswer } from '../../interfaces';
import { getHelperState, getResult } from './model';


import { IconHelp } from '../../../../../icons/icons'

import styles from './sidebar.module.scss';

interface IProps {
  helperState: IHelper,
  currentLevel: number,
  levels: any[],
  difficult: number,
  setHelperState: Dispatch<SetStateAction<IHelper>>,
  setResult: Dispatch<SetStateAction<IResults>>,
}

export const Helper: React.FC<IProps> = ({ helperState, levels, currentLevel, difficult, setHelperState, setResult }) => {

  const helperHandler = () => {
    if (helperState.countOfHelps > 0 && !helperState.attempts?.filter(attempt => attempt.level === currentLevel + 1).length) {
      setHelperState((prev) => getHelperState(prev, levels, currentLevel))
      setResult((prev) => getResult(prev, levels, currentLevel, difficult))
    }
  }

  return (
    <>
      <div className={styles.help} onClick={helperHandler}>
        <img src={IconHelp} className={styles.icon} />
      </div>
      <div className={styles.promts}>
        <span>Количество подсказок:</span>
        <span>{helperState.countOfHelps}</span>
      </div>
    </>
  )
}