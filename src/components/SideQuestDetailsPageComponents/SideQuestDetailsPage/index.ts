import { connect } from 'react-redux';
import { SideQuestDetailsPageView } from './SideQuestDetailsPage';
import actions from './actions';
import selector from './selector';

export const SideQuestDetailsPage = connect(selector, actions)(SideQuestDetailsPageView);