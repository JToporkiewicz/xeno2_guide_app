import { connect } from 'react-redux';
import actions from './actions';
import { MercMissionDetailsPageView } from './MercMissionDetailsPage';
import selector from './selector';

export const MercMissionDetailsPage = connect(selector, actions)(MercMissionDetailsPageView);
