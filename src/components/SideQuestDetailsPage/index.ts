import { connect } from 'react-redux';
import { SideQuestDetailsPageView } from './SideQuestDetailsPage/SideQuestDetailsPage';
import actions from './SideQuestDetailsPage/actions';
import selector from './SideQuestDetailsPage/selector';

export const SideQuestDetailsPage = connect(selector, actions)(SideQuestDetailsPageView);