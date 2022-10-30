import { connect } from 'react-redux';
import actions from './actions';
import { SideQuestStepDetailsView } from './SideQuestStepDetails';

export const SideQuestStepDetails = connect(null, actions)(SideQuestStepDetailsView);