import { connect } from 'react-redux';
import actions from './actions';
import { ClosedLinkedImagePanelView } from './ClosedLinkedImagePanel';

export const ClosedLinkedImagePanel = connect(null, actions)(ClosedLinkedImagePanelView);