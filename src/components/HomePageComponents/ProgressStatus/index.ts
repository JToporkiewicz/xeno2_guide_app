import { connect } from 'react-redux';
import { ProgressStatusView } from './ProgressStatus';
import selector from './selector';

export const ProgressStatus = connect(selector)(ProgressStatusView);