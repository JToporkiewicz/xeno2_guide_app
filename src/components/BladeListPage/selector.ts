import { createSelector } from 'reselect';
import { getBlades, getFieldSkills, getStoryProgress } from '../../redux/selectors';

export default createSelector(
  getBlades,
  getStoryProgress,
  getFieldSkills,
  (blades, storyProgress, fieldSkills) => ({
    blades,
    storyProgress,
    fieldSkills
  })
)