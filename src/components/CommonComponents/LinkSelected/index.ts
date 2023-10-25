import { connect } from 'react-redux';
import { LinkSelectedView } from './LinkSelected';
import actions from './actions';

export const LinkSelected = connect(null, actions)(LinkSelectedView);
