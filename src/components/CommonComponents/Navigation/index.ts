import { connect } from 'react-redux';
import { NavigationView } from './Navigation';
import actions from './actions';

export const Navigation = connect(null, actions)(NavigationView);
