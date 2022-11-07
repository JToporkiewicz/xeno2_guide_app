import { connect } from 'react-redux';
import actions from './actions';
import selector from './selector';
import { Heart2HeartListView } from './Heart2HeartList';

export const Heart2HeartList = connect(selector, actions)(Heart2HeartListView)