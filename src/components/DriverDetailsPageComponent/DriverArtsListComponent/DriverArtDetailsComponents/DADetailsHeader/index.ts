import { connect } from 'react-redux';
import { DADetailsHeaderView } from './DADetailsHeader';
import selector from './selector';
import actions from './actions';

export const DADetailsHeader = connect(selector, actions)(DADetailsHeaderView);