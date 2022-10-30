import { connect } from 'react-redux';
import actions from './DriverDetailsPage/actions';
import { DriverDetailsPageView } from './DriverDetailsPage/DriverDetailsPage';
import selector from './DriverDetailsPage/selector';

export const DriverDetailsPage = connect(selector, actions)(DriverDetailsPageView);
