import { connect } from 'react-redux';
import actions from './actions';
import { MonsterDetailsPageView } from './MonsterDetailsPage';
import selector from './selector';

export const MonsterDetailsPage = connect(selector, actions)(MonsterDetailsPageView);
