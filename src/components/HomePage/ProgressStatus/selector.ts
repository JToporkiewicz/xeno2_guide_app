import { createSelector } from 'reselect';
import {
  getBlades,
  getDrivers,
  getHeart2Heart,
  getLocations,
  getMercMissions,
  getMonsters,
  getQuests,
  getStoryProgress
} from 'reduxState/selectors';
import { IProgressList } from './ProgressStatus';
import { getACCompletion, getDACompletion, getDSCompletion } from 'helpers/completionPercentage';
import { separateMajorArea } from 'helpers';

export default createSelector(
  getStoryProgress,
  getDrivers,
  getBlades,
  getHeart2Heart,
  getQuests,
  getLocations,
  getMercMissions,
  getMonsters,
  (progress, drivers, blades, heart2Hearts, quests, locations, mercMissions, monsters) => ({
    driverArts: drivers.reduce((arts: IProgressList, driver) => {
      const showDriver = driver.chapterUnlocked <= progress.Chapter
        || !progress.OnlyShowAvailable;
      const artCompletion = getDACompletion(driver.arts)
      return {
        ...arts,
        [showDriver ? driver.name : 'Unavailable Drivers']: {
          total: artCompletion.total + (!showDriver && arts['Unavailable Drivers'] ?
            arts['Unavailable Drivers']?.total : 0),
          unlocked: artCompletion.unlocked + (!showDriver && arts['Unavailable Drivers'] ?
            arts['Unavailable Drivers']?.unlocked : 0)
        }
      }}, {}),
    driverSkills: drivers.reduce((skills: IProgressList, driver) => {
      const showDriver: boolean = driver.chapterUnlocked <= progress.Chapter
        || !progress.OnlyShowAvailable;
      const skillTreeCompletion = getDSCompletion(driver.skillTree)
      return {
        ...skills,
        [showDriver ? driver.name : 'Unavailable Drivers']: {
          total: skillTreeCompletion.total
            + (!showDriver && skills['Unavailable Drivers'] ?
              skills['Unavailable Drivers']?.total : 0),
          unlocked: skillTreeCompletion.unlocked
            + (!showDriver && skills['Unavailable Drivers'] ?
              skills['Unavailable Drivers']?.unlocked : 0)
        }
      }}, {}),
    driverHiddenSkills: progress.NewGamePlus || !progress.OnlyShowAvailable ?
      drivers.reduce((skills: IProgressList, driver) => {
        const showDriver = driver.chapterUnlocked <= progress.Chapter
          || !progress.OnlyShowAvailable;
        const hiddenTreeCompletion = getDSCompletion(driver.hiddenSkillTree)
        return {
          ...skills,
          [showDriver ? driver.name : 'Unavailable Drivers']: {
            total: hiddenTreeCompletion.total
              + (!showDriver && skills['Unavailable Drivers'] ?
                skills['Unavailable Drivers']?.total : 0),
            unlocked: hiddenTreeCompletion.unlocked
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
      const acCompletion = getACCompletion(blade.affinityChart)
      return {
        ...arts,
        [showBlade ? blade.name : 'Unavailable Blades']: {
          total: acCompletion.total
              + (!showBlade && arts['Unavailable Blades'] ?
                arts['Unavailable Blades']?.total : 0),
          unlocked: acCompletion.unlocked
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
    h2hUnlocked: heart2Hearts.reduce((types: IProgressList, h2h) => {
      const h2hArea = separateMajorArea(h2h.Area);
      const showH2h = !progress.OnlyShowAvailable || h2h.Available &&
        (locations.find((loc) => loc.Name === h2hArea)?.StoryProgress || 10) <=
        progress.Chapter
      const title = showH2h ? h2hArea : 'Unavailable Heart2Hearts'
      return {
        ...types,
        [title]: {
          total: 1 + (types[title]?.total || 0),
          unlocked: (h2h.Viewed ? 1 : 0) + (types[title]?.unlocked || 0)
        }
      }
    }, {}),
    mercMissionCompleted: mercMissions.reduce((types: IProgressList, mm) => {
      const showH2h = !progress.OnlyShowAvailable || mm.Available &&
      (locations.find((loc) => loc.Name === mm.MissionNation)?.StoryProgress || 10) <=
      progress.Chapter
      const title = showH2h ? mm.MissionNation : 'Unavailable Merc Missions'
      return {
        ...types,
        [title]: {
          total: 1 + (types[title]?.total || 0),
          unlocked: (mm.Completed ? 1 : 0) + (types[title]?.unlocked || 0)
        }
      }}, {}),
    monstersBeaten: monsters.reduce((types: IProgressList, mon) => {
      if (mon.Category !== 'Unique') {
        return types;
      }

      const monArea = separateMajorArea(mon.Area);
      const showH2h = !progress.OnlyShowAvailable || mon.Available &&
        (locations.find((loc) => loc.Name === monArea)?.StoryProgress || 10) <=
        progress.Chapter
      const title = showH2h ? monArea : 'Unavailable Monsters'

      return {
        ...types,
        [title]: {
          total: 1 + (types[title]?.total || 0),
          unlocked: (mon.Beaten ? 1 : 0) + (types[title]?.unlocked || 0)
        }
      }}, {})
  })
)