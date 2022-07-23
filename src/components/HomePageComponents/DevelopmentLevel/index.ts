import { connect } from 'react-redux';
import actions from './actions';
import { DevelopmentLevelView } from './DevelopmentLevel';
import selector from './selector';

export const DevelopmentLevel = connect(selector, actions)(DevelopmentLevelView);