import { connect } from 'react-redux';
import { DriverArtsListComponentView } from './DriverArtsListComponent';
import actions from './actions';

export const DriverArtsListComponent = connect(null, actions)(DriverArtsListComponentView);