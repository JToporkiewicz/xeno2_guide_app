import { connect } from 'react-redux';
import actions from './actions';
import { ChallengeBattleListView } from './ChallengeBattleListPage';
import selectors from './selectors';

export const ChallengeBattleListPage = connect(selectors, actions)(ChallengeBattleListView)