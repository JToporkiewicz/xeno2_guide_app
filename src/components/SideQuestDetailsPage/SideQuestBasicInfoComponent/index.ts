import { connect } from 'react-redux';
import { SideQuestBasicInfoView } from './SideQuestBasicInfoComponent';
import actions from './actions';

export const SideQuestBasicInfo = connect(undefined, actions)(SideQuestBasicInfoView)