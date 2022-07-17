import { createSelector } from 'reselect';
import { getFieldSkills } from '../../../redux/selectors';

export default createSelector(
  getFieldSkills,
  (fieldSkills) => ({
    fieldSkills
  })
)