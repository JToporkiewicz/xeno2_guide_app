import { createSelector } from 'reselect';
import {
  getBlades,
  getDrivers,
  getHeart2Heart,
  getLocations,
  getMercMissions,
  getMonsters,
  getQuests,
  getStoryProgress,
  getFieldSkills,
  getChallenges
} from 'reduxState/selectors';
import { IProgressList } from './ProgressStatus';
import { getACCompletion, getDACompletion, getDSCompletion } from 'helpers/completionPercentage';
import { separateMajorArea } from 'helpers';
import { checkAllAvailability } from 'helpers/checkAvailability';
import { bladeFilter } from 'helpers/bladeFilter';
import { ILocationState } from 'reduxState/interfaces/reduxState';

export default createSelector(
  getStoryProgress,
  getDrivers,
  getBlades,
  getHeart2Heart,
  getQuests,
  getLocations,
  getMercMissions,
  getMonsters,
  getFieldSkills,
  getChallenges,
  (
    progress,
    drivers,
    blades,
    heart2Hearts,
    quests,
    locations,
    mercMissions,
    monsters,
    fieldSkills,
    challenges
  ) => {
    const availability = checkAllAvailability(
      progress,
      locations,
      monsters,
      blades,
      fieldSkills,
      heart2Hearts,
      quests,
      mercMissions,
      challenges
    );
    return {
      driverArts: drivers.reduce((arts: IProgressList, driver) => {
        if (driver.name === 'Vandham' && progress.Chapter > 4) return arts;
        const showDriver = driver.chapterUnlocked <= progress.Chapter
        || !progress.OnlyShowAvailable;
        const artCompletion = getDACompletion(driver.arts)
        return {
          ...arts,
          [showDriver ? driver.name : 'Unavailable Drivers']: {
            total: artCompletion.total + (!showDriver && arts['Unavailable Drivers'] ?
              arts['Unavailable Drivers']?.total : 0),
            unlocked: artCompletion.unlocked + (!showDriver && arts['Unavailable Drivers'] ?
              arts['Unavailable Drivers']?.unlocked : 0),
            id: showDriver ? driver.id : 999
          }
        }}, {}),
      driverSkills: drivers.reduce((skills: IProgressList, driver) => {
        if (driver.name === 'Vandham' && progress.Chapter > 4) return skills;
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
              skills['Unavailable Drivers']?.unlocked : 0),
            id: showDriver ? driver.id : 999
          }
        }}, {}),
      driverHiddenSkills: progress.NewGamePlus || !progress.OnlyShowAvailable ?
        drivers.reduce((skills: IProgressList, driver) => {
          if (driver.name === 'Vandham' && progress.Chapter > 4) return skills;
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
                skills['Unavailable Drivers']?.unlocked : 0),
              id: showDriver ? driver.id : 999
            }
          }}, {})
        : undefined,
      bladesUnlocked: {
        UniqueBlades: {
          total: bladeFilter(availability.blades, quests).length,
          unlocked: bladeFilter(availability.blades, quests)
            .filter((blade) => blade.unlocked).length
        }
      },
      bladeAffinitySkills: bladeFilter(availability.blades, quests)
        .reduce((arts: IProgressList, blade) => {
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
      h2hUnlocked: availability.heart2Hearts.reduce((types: IProgressList, h2h) => {
        const h2hArea = separateMajorArea(h2h.Area);
        const loc = locations.find((loc) => loc.Name === h2hArea);
        const showH2h = !progress.OnlyShowAvailable || h2h.Available &&
          (loc?.StoryProgress || 10) <= progress.Chapter
        const title = showH2h ? h2hArea : 'Unavailable Heart2Hearts'
        return {
          ...types,
          [title]: {
            total: 1 + (types[title]?.total || 0),
            unlocked: (h2h.Viewed ? 1 : 0) + (types[title]?.unlocked || 0),
            id: showH2h && loc ? loc.id : 999
          }
        }
      }, {}),
      mercMissionCompleted: availability.mercMissions.reduce((types: IProgressList, mm) => {
        const loc = locations.find((loc) => loc.Name === mm.MissionNation);
        const showMM = !progress.OnlyShowAvailable || mm.Available &&
          (loc?.StoryProgress || 10) <= progress.Chapter
        const title = showMM ? mm.MissionNation : 'Unavailable Merc Missions'
        return {
          ...types,
          [title]: {
            total: 1 + (types[title]?.total || 0),
            unlocked: (mm.Completed ? 1 : 0) + (types[title]?.unlocked || 0),
            id: showMM && loc ? loc.id : 999
          }
        }}, {}),
      monstersBeaten: availability.monsters.reduce((types: IProgressList, mon) => {
        if (mon.Category !== 'Unique') {
          return types;
        }

        const monArea = separateMajorArea(mon.Area);
        const loc = locations.find((loc) => loc.Name === monArea);
        const showMon = !progress.OnlyShowAvailable || mon.Available &&
          (loc?.StoryProgress || 10) <= progress.Chapter
        const title = showMon ? monArea : 'Unavailable Monsters'

        return {
          ...types,
          [title]: {
            total: 1 + (types[title]?.total || 0),
            unlocked: (mon.Beaten ? 1 : 0) + (types[title]?.unlocked || 0),
            id: showMon && loc ? loc.id : 999
          }
        }}, {}),
      challengesBeaten: availability.challengeBattles.reduce((types: IProgressList, cb) => ({
        'Battles': {
          total: 1 + (types.Battles?.total || 0),
          unlocked: (cb.beaten ? 1 : 0) + (types.Battles?.unlocked || 0) 
        }
      }), {}),
      locationsMapped: locations.reduce((types: IProgressList, loc) => {
        if (loc.Name === 'Ancient Ship') {
          return types;
        }
        
        if (loc.Name === 'Indoline Praetorium' && progress.Chapter > 8) {
          return types;
        }

        const innerLocations = loc.InnerMajorAreas.reduce((list, inner) =>
          list.concat(inner.Locations), [] as ILocationState[])

        const showName = !progress.OnlyShowAvailable
          || loc.StoryProgress <= progress.Chapter

        const title = showName ? loc.Name : 'Unavailable Location'
        return {
          ...types,
          [title]: {
            total: (types[title]?.total || 0) + innerLocations.length,
            unlocked: (types[title]?.unlocked || 0) + innerLocations.filter((i) => i.Mapped).length,
            id: showName ? loc.id : 999
          }
        }
      }, {})
    }}
)