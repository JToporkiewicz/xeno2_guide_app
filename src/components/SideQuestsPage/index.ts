import { connect } from 'react-redux';
import actions from './actions';
import selector from './selector';
import { SideQuestsPageView } from './SideQuestsPage';

export const SideQuestPage = connect(selector, actions)(SideQuestsPageView);