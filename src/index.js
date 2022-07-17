import { render } from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import App from './components/App';
import 'scss/custom.scss';
import 'scss/image.scss';
import 'scss/tree.scss';
import { reducers } from './redux/reducers';
import { effects } from './redux/effects';
import { initialLoad } from './redux/actions';
import { debounce } from 'lodash';

const epicMiddleware = createEpicMiddleware();
const loadState = () => {
  try {
    const storedState = JSON.parse(localStorage.getItem('state'));
    if (storedState === null) {
      return {};
    }
    return storedState;
  } catch (err) {
    return {};
  }
}

const rehydratedState = loadState();

const middleware = compose(
  applyMiddleware(epicMiddleware),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const store = createStore(reducers, rehydratedState, middleware);
epicMiddleware.run(effects);
const saveState = () => {
  const newState = store.getState();
  try {
    window.localStorage.setItem('state', JSON.stringify(newState))
  } catch (err) {
    console.log(err)
  }
}
store.subscribe(debounce(saveState, 100))

store.dispatch(initialLoad())

render(
  <Provider store={store}>
    <Router>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css"
        integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb"
        crossOrigin="anonymous"
      />
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);