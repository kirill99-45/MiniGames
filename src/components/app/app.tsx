import { Routes, Route } from 'react-router-dom';

import { StartPage } from './pages/start-page/start-page';
import { GamePage } from './pages/game-page/game-page';
import { Layout } from '../layout/layout';


export const App = () => {
  return (
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<StartPage />} />
          <Route path='game/:gameLevel' element={<GamePage />} />
        </Route>
      </Routes>
  )
}
