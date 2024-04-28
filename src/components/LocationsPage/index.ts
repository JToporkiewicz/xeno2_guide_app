import { connect } from 'react-redux';
import actions from './actions';
import selectors from './selectors';
import { LocationsPageView } from './LocationsPage';

export const LocationsPage = connect(selectors, actions)(LocationsPageView)