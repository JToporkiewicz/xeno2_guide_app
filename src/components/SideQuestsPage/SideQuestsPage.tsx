import HeaderContainer from 'components/CommonComponents/Containers/HeaderContainer'
import { IQuest, IStoryProgress } from 'interfaces'
import { useRef, useEffect } from 'react'
import { IUpdateQuestStatus } from 'reduxState/interfaces/quest'
import { SideQuestsList } from './SideQuestsList/SideQuestsList'

interface IDispatchProps {
  updateQuestStatus: (payload:IUpdateQuestStatus) => void;
  saveQuestStatus: (payload:IUpdateQuestStatus[]) => void;
  fetchQuests: () => void;
}

interface IProps {
  quests: IQuest[],
  storyProgress: IStoryProgress
}

export const SideQuestsPageView = (props:IProps & IDispatchProps) => {
  const toUpdate = useRef([] as IQuest[]);

  useEffect(() => {
    return () => {
      if (toUpdate.current.length) {
        props.saveQuestStatus(toUpdate.current.map((quest) => ({
          questId: quest.id,
          status: quest.Status
        })))
      }
    }
  }, [])

  const updateQuestCompleted = (questId: number, status:string | boolean) => {
    const foundQuest = props.quests.find((q) => q.id === questId)
    if(foundQuest && typeof status === 'string') {
      toUpdate.current = toUpdate.current
        .filter((q) => q.id !== questId)
        .concat({
          ...foundQuest,
          Status: status
        })

      props.updateQuestStatus({
        questId,
        status
      })
    }
  }

  return <>
    <HeaderContainer title="Quests" refreshData={props.fetchQuests}/>
    <SideQuestsList
      questType='Main Story Quests'
      quests={props.quests.filter((q) => q.Type === 'Main Story Quest')}
      storyProgress={props.storyProgress}
      updateQuestStatus={updateQuestCompleted}
    />
    <SideQuestsList
      questType='Blade Quests'
      quests={props.quests.filter((q) => q.Type === 'Blade Quest')}
      storyProgress={props.storyProgress}
      updateQuestStatus={updateQuestCompleted}
    />
    <SideQuestsList
      questType='Regular Side Quests'
      quests={props.quests.filter((q) => q.Type === 'Regular Side Quest')}
      storyProgress={props.storyProgress}
      updateQuestStatus={updateQuestCompleted}
    />
    <SideQuestsList
      questType='DLC Quests'
      quests={props.quests.filter((q) => q.Type === 'DLC Quest')}
      storyProgress={props.storyProgress}
      updateQuestStatus={updateQuestCompleted}
    />
  </>
}