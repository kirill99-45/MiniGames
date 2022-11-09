import ReactDOM from 'react-dom/client';

import { App } from './components/app/app';

import { BrowserRouter } from 'react-router-dom';

import { legacy_createStore as createStore } from 'redux';
import { rootReducer } from './components/Redux/rootReducer';
import { Provider } from 'react-redux';

import './index.scss';

const store = createStore(rootReducer);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
