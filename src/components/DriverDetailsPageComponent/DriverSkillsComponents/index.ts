import { connect } from 'react-redux';
import { DriverSkillsComponentView } from './DriverSkillsComponent';
import actions from './actions';

export const DriverSkillsComponent = connect(null, actions)(DriverSkillsComponentView)