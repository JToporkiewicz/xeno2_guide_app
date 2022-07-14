import {
  saveStoryProgress,
  showLoader,
  hideLoader
} from '../../redux/actions/core';
import {
  updateShowBlade,
  updateBladeUnlocked,
  saveBladeStatus
} from '../../redux/actions/blades';
import {
  fetchFieldSkills,
  saveFieldSkillLevelUnlocked,
  updateFieldSkillLevelUnlocked
} from '../../redux/actions/fieldSkills';

export default {
  saveStoryProgress,
  showLoader,
  hideLoader,
  updateShowBlade,
  updateBladeUnlocked,
  saveBladeStatus,
  fetchFieldSkills,
  updateFieldSkillLevelUnlocked,
  saveFieldSkillLevelUnlocked
}