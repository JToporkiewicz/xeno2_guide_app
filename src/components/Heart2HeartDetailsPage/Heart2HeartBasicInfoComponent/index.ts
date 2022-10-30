import { connect } from 'react-redux';
import { Heart2HeartBasicInfoView } from './Heart2HeartBasicInfoComponent';
import actions from './actions';

export const Heart2HeartBasicInfo = connect(undefined, actions)(Heart2HeartBasicInfoView)