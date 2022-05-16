import { connect } from 'react-redux';
import { BladeListPageView } from './BladeListPage';
import selector from './selector';
import actions from './actions';

export const BladeListPage = connect(selector, actions)(BladeListPageView)