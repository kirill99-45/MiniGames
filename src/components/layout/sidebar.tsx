import styles from './style.module.scss';

interface IProps {
  sidebarState : boolean,
}

export const Sidebar: React.FC<IProps> = ({ sidebarState }) => {

  return (
    <div className={sidebarState ? styles.sidebar : styles.sidebar__active}>

    </div>
  )
}
