import { connect } from 'react-redux';
import { BladeDetailsPageView } from './BladeDetailsPage';
import selector from './selector';
import actions from './actions';

export const BladeDetailsPage = connect(selector, actions)(BladeDetailsPageView);