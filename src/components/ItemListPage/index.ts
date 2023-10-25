import { connect } from 'react-redux';
import selectors from './selectors';
import actions from './actions';
import { ItemListPageView } from './ItemListPage';

export const ItemListPage = connect(selectors, actions)(ItemListPageView)
