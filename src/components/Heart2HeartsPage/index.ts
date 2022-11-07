import { connect } from 'react-redux';
import actions from './actions';
import { Heart2HeartsListPageView } from './Heart2HeartListPage';
import selector from './selector';

export const Heart2HeartsListPage = connect(selector, actions)(Heart2HeartsListPageView);
