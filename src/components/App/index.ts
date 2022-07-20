import { connect } from 'react-redux';
import actions from './actions';
import selector from './selector';
import { AppView } from './App';

export const App = connect(selector, actions)(AppView);