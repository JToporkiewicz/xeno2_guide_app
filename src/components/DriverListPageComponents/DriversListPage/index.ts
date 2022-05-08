import { connect } from 'react-redux';
import actions from './actions';
import { DriversListPageView } from './DriversListPage';
import selector from './selector';

export const DriversListPage = connect(selector, actions)(DriversListPageView)