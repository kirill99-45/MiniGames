import { Routes, Route } from 'react-router-dom';

import { StartPage } from './MatnGame/start-page/start-page';
import { GamePage } from './MatnGame/game-page/game-page';
import { Layout } from '../layout/layout';
import { HomePage } from './HomePage/home-page';
import { TechEnglish } from './TechEnglish/tech-english';


export const App = () => {
  return (
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage/>} />
          <Route path='math-game/' element={<StartPage />} />
          <Route path='math-game/:gameLevel' element={<GamePage />} />
          <Route path='tech-english' element={<TechEnglish />} />
        </Route>
      </Routes>
  )
}
