import { connect } from 'react-redux';
import actions from './actions';
import { DriverDetailsPageView } from './DriverDetailsPage';
import selector from './selector';

export const DriverDetailsPage = connect(selector, actions)(DriverDetailsPageView);
