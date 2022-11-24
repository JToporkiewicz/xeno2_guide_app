import { connect } from 'react-redux';
import actions from './actions';
import { MonsterListPageView } from './MonsterListPage';
import selectors from './selectors';

export const MonsterListPage = connect(selectors, actions)(MonsterListPageView);
