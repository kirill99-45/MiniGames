import styles from './words-page.module.scss';

export const Examples = () => {
    return (
        <footer>
            <div className={styles.practice__example}>
                <p className={styles['practice__example-title']}>Пример</p>
                <p className={styles['practice__example-text']}>But when it does it's an extraordinary... kind of <strong>remarkable</strong> miracle</p>
                <p className={styles['practice__example-text']}>Но когда он работает.. это <strong>невероятно</strong>.. это поразительно.</p>
            </div>
            <button className={styles['practice-button']}>Продолжить</button>
        </footer>
    )
}