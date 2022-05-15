import { createSelector } from 'reselect';
import { getDrivers } from '../../../redux/selectors';

export default createSelector(
  getDrivers,
  (drivers) => ({
    driverArts: drivers.reduce((arts, driver) => ({
      ...arts,
      [driver.name]: {
        total: driver.arts.length * 6,
        unlocked: driver.arts.reduce((artTotal, art) => artTotal + art.levelUnlocked, 0)
      }
    }), {}),
    driverSkills: drivers.reduce((skills, driver) => ({
      ...skills,
      [driver.name]: {
        total: driver.skillTree.tier1.length
          + driver.skillTree.tier2.length
          + driver.skillTree.tier3.length,
        unlocked: driver.skillTree.tier1.filter((node) => node.Unlocked).length
          + driver.skillTree.tier2.filter((node) => node.Unlocked).length
          + driver.skillTree.tier3.filter((node) => node.Unlocked).length
      }
    }), {}),
    driverHiddenSkills: drivers.reduce((skills, driver) => ({
      ...skills,
      [driver.name]: {
        total: driver.hiddenSkillTree.tier1.length
          + driver.hiddenSkillTree.tier2.length
          + driver.hiddenSkillTree.tier3.length,
        unlocked: driver.hiddenSkillTree.tier1.filter((node) => node.Unlocked).length
          + driver.hiddenSkillTree.tier2.filter((node) => node.Unlocked).length
          + driver.hiddenSkillTree.tier3.filter((node) => node.Unlocked).length
      }
    }), {})
  })
)