import {
  getQuests,
  getSelected,
  getBlades,
  getStoryProgress,
  getLocations,
  getMercMissions,
  getMonsters,
  getFieldSkills,
  getHeart2Heart,
  getChallenges
} from 'reduxState/selectors';
import { createSelector } from 'reselect';
import { defaultSideQuest } from 'reduxState/interfaces/quest';
import { checkAllAvailability } from 'helpers/checkAvailability';
import { IQuestAvailability } from 'reduxState/interfaces/availabilityState';
import { Routes } from 'helpers/routesConst';

export default createSelector(
  getQuests,
  getSelected,
  getBlades,
  getStoryProgress,
  getLocations,
  getMonsters,
  getFieldSkills,
  getMercMissions,
  getHeart2Heart,
  getChallenges,
  (
    quests,
    selected,
    blades,
    storyProgress,
    locations,
    monsters,
    fieldSkills,
    mercMissions,
    heart2Hearts,
    challenges
  ) => {
    const availability = checkAllAvailability(
      storyProgress,
      locations,
      monsters,
      blades,
      fieldSkills,
      heart2Hearts,
      quests,
      mercMissions,
      challenges
    );
    const foundQuest: IQuestAvailability | undefined = availability.sideQuests.find((q) =>
      q.id === selected.id && selected.area === 'sideQuest')
    if (foundQuest) {

      const nextQuest = availability.sideQuests.find((d) =>
        d.id === (foundQuest.id === quests.length ? 1 : foundQuest.id + 1))
      let nextNavigation = {}
      if (nextQuest?.Available
      || storyProgress.NewGamePlus
      || !storyProgress.OnlyShowAvailable) {
        nextNavigation = {
          nextLink: nextQuest ? Routes.SIDE_QUEST + nextQuest.id : undefined,        
          nextId: nextQuest?.id,
          nextTitle: nextQuest?.Name,
        }
      }
      
      const previousQuest = availability.sideQuests.find((d) =>
        d.id === (foundQuest.id === 1 ? quests.length : foundQuest.id - 1))
      let previousNavigation = {}
      if (previousQuest?.Available
      || storyProgress.NewGamePlus
      || !storyProgress.OnlyShowAvailable) {
        previousNavigation = {
          previousLink: previousQuest ? Routes.SIDE_QUEST + previousQuest.id : undefined,        
          previousId: previousQuest?.id,
          previousTitle: previousQuest?.Name
        }
      }

      return {
        quest: foundQuest,
        headerNavigation: {
          area: 'sideQuest',
          ...nextNavigation,
          ...previousNavigation
        },
      }
    }

    return {
      quest: defaultSideQuest
    }
  }
)