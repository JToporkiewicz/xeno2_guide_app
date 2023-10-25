import { connect } from 'react-redux';
import { ItemListView } from './ItemList';
import selectors from './selectors';

export const ItemList = connect(selectors)(ItemListView);