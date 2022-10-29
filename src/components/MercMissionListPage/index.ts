import { connect } from 'react-redux';
import { MercMissionListPageView } from './MercMissionListPage';
import selector from './selectors';

export const MercMissionListPage = connect(selector)(MercMissionListPageView);
