import { connect } from 'react-redux';
import { MercMissionListView } from './MercMissionList';
import actions from './actions';

export const MercMissionList = connect(null, actions)(MercMissionListView);
