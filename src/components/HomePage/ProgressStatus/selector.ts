import { createSelector } from 'reselect';
import {
  getBlades,
  getDrivers,
  getHeart2Heart,
  getQuests,
  getStoryProgress
} from 'reduxState/selectors';
import { IProgressList } from './ProgressStatus';

export default createSelector(
  getStoryProgress,
  getDrivers,
  getBlades,
  getHeart2Heart,
  getQuests,
  (progress, drivers, blades, heart2Hearts, quests) => ({
    driverArts: drivers.reduce((arts: IProgressList, driver) => {
      const showDriver = driver.chapterUnlocked <= progress.Chapter
        || !progress.OnlyShowAvailable;
      return {
        ...arts,
        [showDriver ? driver.name : 'Unavailable Drivers']: {
          total: driver.arts.length * 6 + (!showDriver && arts['Unavailable Drivers'] ?
            arts['Unavailable Drivers']?.total : 0),
          unlocked: driver.arts.reduce((artTotal, art) => artTotal + art.levelUnlocked, 0)
            + (!showDriver && arts['Unavailable Drivers'] ?
              arts['Unavailable Drivers']?.unlocked : 0)
        }
      }}, {}),
    driverSkills: drivers.reduce((skills: IProgressList, driver) => {
      const showDriver = driver.chapterUnlocked <= progress.Chapter
        || !progress.OnlyShowAvailable;
      return {
        ...skills,
        [showDriver ? driver.name : 'Unavailable Drivers']: {
          total: driver.skillTree.tier1.length
            + driver.skillTree.tier2.length
            + driver.skillTree.tier3.length
            + (!showDriver && skills['Unavailable Drivers'] ?
              skills['Unavailable Drivers']?.total : 0),
          unlocked: driver.skillTree.tier1.filter((node) => node.Unlocked).length
            + driver.skillTree.tier2.filter((node) => node.Unlocked).length
            + driver.skillTree.tier3.filter((node) => node.Unlocked).length
            + (!showDriver && skills['Unavailable Drivers'] ?
              skills['Unavailable Drivers']?.unlocked : 0)
        }
      }}, {}),
    driverHiddenSkills: progress.NewGamePlus || !progress.OnlyShowAvailable ?
      drivers.reduce((skills: IProgressList, driver) => {
        const showDriver = driver.chapterUnlocked <= progress.Chapter
          || !progress.OnlyShowAvailable;
        return {
          ...skills,
          [showDriver ? driver.name : 'Unavailable Drivers']: {
            total: driver.hiddenSkillTree.tier1.length
              + driver.hiddenSkillTree.tier2.length
              + driver.hiddenSkillTree.tier3.length
              + (!showDriver && skills['Unavailable Drivers'] ?
                skills['Unavailable Drivers']?.total : 0),
            unlocked: driver.hiddenSkillTree.tier1.filter((node) => node.Unlocked).length
              + driver.hiddenSkillTree.tier2.filter((node) => node.Unlocked).length
              + driver.hiddenSkillTree.tier3.filter((node) => node.Unlocked).length
              + (!showDriver && skills['Unavailable Drivers'] ?
                skills['Unavailable Drivers']?.unlocked : 0)
          }
        }}, {})
      : undefined,
    bladesUnlocked: {
      UniqueBlades: {
        total: blades.length,
        unlocked: blades.filter((blade) => blade.unlocked).length
      }
    },
    bladeAffinitySkills: blades.reduce((arts: IProgressList, blade) => {
      const showBlade = blade.available || !progress.OnlyShowAvailable;
      return {
        ...arts,
        [showBlade ? blade.name : 'Unavailable Blades']: {
          total: blade.affinityChart.branches
            .reduce((branchTotal, branch) => branch.nodes.length + branchTotal, 0)
              + (!showBlade && arts['Unavailable Blades'] ?
                arts['Unavailable Blades']?.total : 0),
          unlocked: blade.affinityChart.branches
            .reduce((branchTotal, branch) => branch.nodes
              .filter((node) => node.Unlocked).length + branchTotal, 0)
              + (!showBlade && arts['Unavailable Blades'] ?
                arts['Unavailable Blades']?.unlocked : 0)
        }
      }}, {}),
    questsFinished: quests.reduce((types: IProgressList, quest) => ({
      ...types,
      [quest.Type]: {
        total: 1 + (types[quest.Type]?.total || 0),
        unlocked: (quest.Status === 'FINISHED' ? 1 : 0) + (types[quest.Type]?.unlocked || 0)
      }
    }), {}),
    h2hUnlocked: {
      'Heart2Hearts Viewed': {
        total: heart2Hearts.length,
        unlocked: heart2Hearts.filter((heart2Heart) => heart2Heart.Viewed).length
      }
    },
  })
)