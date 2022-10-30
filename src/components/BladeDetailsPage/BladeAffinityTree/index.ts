import { connect } from 'react-redux';
import { BladeAffinityTreeView } from './BladeAffinityTree';
import actions from './actions';

export const BladeAffinityTree = connect(null, actions)(BladeAffinityTreeView)