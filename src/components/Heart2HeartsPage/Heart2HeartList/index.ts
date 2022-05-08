import { connect } from 'react-redux';
import actions from './actions';
import { Heart2HeartListView } from './Heart2HeartList';
import selector from './selector';

export const Heart2HeartList = connect(selector, actions)(Heart2HeartListView)