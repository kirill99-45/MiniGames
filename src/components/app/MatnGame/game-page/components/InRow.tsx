import styles from '../game-page.module.scss'


export const InRow: React.FC<{ inRow : number }> = ({ inRow }) => {

    return <div className={styles['in-row']}>Количество правильных ответов подряд {inRow}</div>
}