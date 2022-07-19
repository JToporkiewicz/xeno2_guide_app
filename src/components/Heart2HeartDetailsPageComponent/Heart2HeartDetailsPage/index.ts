import { connect } from 'react-redux';
import { Heart2HeartDetailsPageView } from './Heart2HeartDetailsPage';
import actions from './actions';
import selector from './selector';

export const Heart2HeartDetailsPage = connect(selector, actions)(Heart2HeartDetailsPageView);