import HeaderContainer from 'components/CommonComponents/Containers/HeaderContainer';
import { IItem } from 'interfaces'
import { ItemList } from './ItemList';
import { ISelectedState } from 'reduxState/interfaces/reduxState';

interface IDispatchProps {
  fetchItems: () => void;
}

interface IProps {
  items: IItem[];
  selected: ISelectedState;
}

export const ItemListPageView = (props: IProps & IDispatchProps) => {
  return <>
    <HeaderContainer title='Items' refreshData={props.fetchItems} />
    <>
      <ItemList
        title='Pouch Items'
        items={props.items.filter((i) => i.ItemTypeID < 13)}
        selected={props.selected}
      />
      <ItemList
        title='Treasures'
        items={props.items.filter((i) => i.ItemTypeID == 13)}
      />
      <ItemList
        title='Key Items'
        items={props.items.filter((i) => i.ItemTypeID == 14)}
      />
      <ItemList
        title='Collectibles'
        items={props.items.filter((i) => i.ItemTypeID > 14)}
      />
    </>
  </>
}