import { createSelector } from 'reselect';
import { defaultBladeState } from '../../../redux/interfaces/blades';
import { getBlades, getItems, getItemTypes, getSelected } from '../../../redux/selectors';

export default createSelector(
  getBlades,
  getItems,
  getItemTypes,
  getSelected,
  (blades, items, itemTypes, selected) => {
    const foundBlade = blades.find((blade) => blade.id === selected.id)
    if (foundBlade) {
      return {
        bladeDetails: foundBlade,
        item1: items.find((item) => item.id === foundBlade.favItem1),
        item2: items.find((item) => item.id === foundBlade.favItem2),
        itemType1: itemTypes.find((item) => item.id === foundBlade.favItemType1),
        itemType2: itemTypes.find((item) => item.id === foundBlade.favItemType2),
      }
    }
    return {
      bladeDetails: defaultBladeState
    }
  }
)