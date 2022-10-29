import { connect } from 'react-redux';
import actions from './actions';
import { MercMissionListPageView } from './MercMissionListPage';
import selector from './selectors';

export const MercMissionListPage = connect(selector, actions)(MercMissionListPageView);
