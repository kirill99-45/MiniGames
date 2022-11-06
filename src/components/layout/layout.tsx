import React, { useState } from 'react';

import { Outlet } from 'react-router-dom';
import { Header } from './header';
import { Sidebar } from './sidebar';
import { ModalChooseLevel } from '../Modals/modal__level';

import styles from './style.module.scss';


export const Layout: React.FC = () => {

  const [sidebarState, setSidebarState] = useState(false)

  return (
    <>
      <Header setSidebarState={setSidebarState} sidebarState={sidebarState}/>
      <div className={styles.wrapper}>
        <Sidebar sidebarState={sidebarState}/>
        <Outlet />
      </div>
    </>
  )
}
