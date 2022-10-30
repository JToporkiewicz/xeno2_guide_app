import { connect } from 'react-redux';
import { BladeDetailsPageView } from './BladeDetailsPage/BladeDetailsPage';
import selector from './BladeDetailsPage/selector';
import actions from './BladeDetailsPage/actions';

export const BladeDetailsPage = connect(selector, actions)(BladeDetailsPageView);