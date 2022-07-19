import { createSelector } from 'reselect';
import { getFieldSkills } from 'reduxState/selectors';

export default createSelector(
  getFieldSkills,
  (fieldSkills) => ({
    fieldSkills
  })
)