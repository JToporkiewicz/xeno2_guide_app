import { connect } from 'react-redux';
import selector from './selector';
import { DADetailsView } from './DADetails';

export const DADetails = connect(selector)(DADetailsView);