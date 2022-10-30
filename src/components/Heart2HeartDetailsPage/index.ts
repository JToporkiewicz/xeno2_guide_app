import { connect } from 'react-redux';
import { Heart2HeartDetailsPageView } from './Heart2HeartDetailsPage/Heart2HeartDetailsPage';
import actions from './Heart2HeartDetailsPage/actions';
import selector from './Heart2HeartDetailsPage/selector';

export const Heart2HeartDetailsPage = connect(selector, actions)(Heart2HeartDetailsPageView);