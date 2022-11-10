import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import { Outlet } from 'react-router-dom';
import { Header } from './header';
import { Sidebar } from './sidebar';

import styles from './style.module.scss';


export const Layout: React.FC = () => {

  const theme = useSelector((state: any) => state.mainSettingsReducer.theme.isLight) ? 'light' : 'dark'

  

  const [sidebarState, setSidebarState] = useState(false)

  return (
    <div className={styles[`body-${theme}`]}>
      <Header setSidebarState={setSidebarState} sidebarState={sidebarState}/>
      <div className={styles.wrapper}>
        <Sidebar />
        <Outlet />
      </div>
    </div>
  )
}
