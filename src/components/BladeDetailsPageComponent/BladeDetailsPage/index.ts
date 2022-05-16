import { connect } from 'react-redux';
import { BladeDetailsPageView } from './BladeDetailsPage';
import selector from './selector';

export const BladeDetailsPage = connect(selector)(BladeDetailsPageView);