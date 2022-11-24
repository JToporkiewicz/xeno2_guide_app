import HeaderContainer from 'components/CommonComponents/Containers/HeaderContainer';
import { IStoryProgress } from 'interfaces';
import { useEffect, useRef } from 'react';
import { IUpdateMonster } from 'reduxState/interfaces/monsters';
import { IMajorLocations, IMonsterState } from 'reduxState/interfaces/reduxState'
import { MonsterListView } from './MonsterList/MonsterList';

interface IProps {
  monsters: IMonsterState[];
  storyProgress: IStoryProgress;
  locations: IMajorLocations[];
}

interface IDispatchProps {
  updateMonsterStatus: (input:IUpdateMonster) => void;
  saveMonsterStatus: (input:IUpdateMonster) => void;
  fetchAllMonsters: () => void;
}

export const MonsterListPageView = (props: IProps & IDispatchProps) => {
  const toUpdate = useRef([] as IUpdateMonster[]);

  useEffect(() => {
    return () => {
      toUpdate.current.map((mon) =>
        props.saveMonsterStatus(mon)
      )
    }
  }, [])

  const updateMonStatus = (monId: number, beaten: boolean) => {
    props.updateMonsterStatus({
      id: monId,
      beaten: beaten
    });
    toUpdate.current = toUpdate.current
      .filter((updateMon) => updateMon.id !== monId)
      .concat([{
        id: monId,
        beaten: beaten
      }])
  }
  return <>
    <HeaderContainer title='Monsters' refreshData={props.fetchAllMonsters} />
    <>
      <MonsterListView
        monsterCategory='Unique'
        monsters={props.monsters.filter((mon) => mon.Category === 'Unique')}
        storyProgress={props.storyProgress}
        updateMonStatus={updateMonStatus}
      />
      <MonsterListView
        monsterCategory='Normal'
        monsters={props.monsters.filter((mon) => mon.Category === 'Normal')}
        storyProgress={props.storyProgress}
        updateMonStatus={updateMonStatus}
      />
      <MonsterListView
        monsterCategory='Minor'
        monsters={props.monsters.filter((mon) => mon.Category === 'Minor')}
        storyProgress={props.storyProgress}
        updateMonStatus={updateMonStatus}
      />
      <MonsterListView
        monsterCategory='Quest'
        monsters={props.monsters.filter((mon) => mon.Category === 'Quest')}
        storyProgress={props.storyProgress}
        updateMonStatus={updateMonStatus}
      />
      <MonsterListView
        monsterCategory='Salvage'
        monsters={props.monsters.filter((mon) => mon.Category === 'Salvage')}
        storyProgress={props.storyProgress}
        updateMonStatus={updateMonStatus}
      />
      <MonsterListView
        monsterCategory='Story'
        monsters={props.monsters.filter((mon) => mon.Category === 'Story')}
        storyProgress={props.storyProgress}
        updateMonStatus={updateMonStatus}
      />
      <MonsterListView
        monsterCategory='Boss'
        monsters={props.monsters.filter((mon) =>
          mon.Category === 'Boss' || mon.Category === 'Superboss')}
        storyProgress={props.storyProgress}
        updateMonStatus={updateMonStatus}
      />
      <MonsterListView
        monsterCategory='Challenge'
        monsters={props.monsters.filter((mon) => mon.Category === 'Challenge')}
        storyProgress={props.storyProgress}
        updateMonStatus={updateMonStatus}
      />
    </>
  </>
}