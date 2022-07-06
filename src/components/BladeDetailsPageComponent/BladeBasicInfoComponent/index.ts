import { connect } from 'react-redux';
import { BladeBasicInfoComponentView } from './BladeBasicInfoComponent';
import actions from './actions';

export const BladeBasicInfoComponent = connect(null, actions)(BladeBasicInfoComponentView);