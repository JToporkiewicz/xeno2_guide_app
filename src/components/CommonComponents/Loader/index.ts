import { connect } from 'react-redux';
import { LoaderView } from './Loader';
import selector from './selector';

export const Loader = connect(selector)(LoaderView);