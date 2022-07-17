import { connect } from 'react-redux';
import { FieldSkillsView } from './FieldSkills';
import selector from './selector';
import actions from './actions';

export const FieldSkills = connect(selector, actions)(FieldSkillsView)