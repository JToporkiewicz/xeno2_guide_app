import {
  showLoader,
  hideLoader
} from 'reduxState/actions/core';
import {
  updateShowBlade,
  updateBladeUnlocked,
  saveBladeStatus,
  fetchAllBlades
} from 'reduxState/actions/blades';
import { fetchFieldSkills } from 'reduxState/actions/fieldSkills';

export default {
  showLoader,
  hideLoader,
  updateShowBlade,
  updateBladeUnlocked,
  saveBladeStatus,
  fetchAllBlades,
  fetchFieldSkills
}