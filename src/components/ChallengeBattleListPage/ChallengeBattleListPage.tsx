import CollapsibleComponent from 'components/CommonComponents/Containers/CollapsibleComponent';
import HeaderContainer from 'components/CommonComponents/Containers/HeaderContainer';
import { OptionsCheckbox } from 'components/CommonComponents/FormComponents/OptionsCheckbox';
import OrderBy from 'components/CommonComponents/OrderBy';
import Table from 'components/CommonComponents/Table';
import { sortFunction } from 'helpers';
import { IStoryProgress } from 'interfaces';
import path from 'path';
import { useEffect, useRef, useState } from 'react';
import { IChallengeBattleAvailability } from 'reduxState/interfaces/availabilityState';
import { IUpdateChallengeBattle } from 'reduxState/interfaces/challengeBattles';
import { IUpdateUnlocked } from 'reduxState/interfaces/reduxState';
import { ChallengeBattleDetails } from './ChallengeBattleDetails';
import { DifficultyIcons } from 'components/CommonComponents/DifficultyIcons';
import { RequirementArea } from 'interfaces/common';

interface IOwnProps {
  challengeBattles: IChallengeBattleAvailability[],
  storyProgress: IStoryProgress,
  fetchChallengeBattles: () => void,
  updateChallengeBattles: (payload: IUpdateChallengeBattle) => void,
  saveChallengeBattles: (payload: IUpdateUnlocked) => void
}

export const ChallengeBattleListView = (props: IOwnProps) => {
  const [orderType, setOrderType] = useState('default');
  const [sortOrderAsc, setSortOrderAsc] = useState(true);
  const [focus, setFocused] = useState(0);
  const toUpdate = useRef([] as IUpdateChallengeBattle[]);

  const selectChallenge = (index: number) => {
    setFocused(index)
    window.scroll({
      top: 0,
      behavior: 'smooth'
    })
  }

  const orderOptions: {[key:string]: keyof IChallengeBattleAvailability} = {
    default: 'id',
    alphabetically: 'name',
    difficulty: 'difficulty',
    waves: 'waves',
    'max level': 'maxLv',
    beaten: 'beaten',
    available: 'available'
  }

  const getOrderTypeColumn = (order: string): keyof IChallengeBattleAvailability => {
    return orderOptions[order] || orderOptions.default
  }

  useEffect(() => {
    return () => {
      if (toUpdate.current.length) {
        props.saveChallengeBattles({
          unlocked: toUpdate.current.filter((cb) => cb.beaten).map((cb) => cb.id),
          locked: toUpdate.current.filter((cb) => !cb.beaten).map((cb) => cb.id)
        })
      }
    }
  }, [])

  const updateChallengeStatus = (challId: number, beaten: boolean) => {
    props.updateChallengeBattles({
      id: challId,
      beaten
    });
    toUpdate.current = toUpdate.current
      .filter((updateChallenge) => updateChallenge.id !== challId)
      .concat([{
        id: challId,
        beaten
      }])

    if (!beaten) {
      const dependentChallenge = props.challengeBattles.filter((cb) =>
        cb.prerequisites && cb.prerequisites.find((p) =>
          p.area === RequirementArea.Challenge
          && p.reqId === challId
        )
      )

      dependentChallenge.forEach((cb) =>
        updateChallengeStatus(cb.id, false)
      )
    }
  }

  return <>
    <HeaderContainer title='DLC Challenge Battles' refreshData={props.fetchChallengeBattles} />
    <CollapsibleComponent header={'Challenge Battles'}>
      <p>{`Challenge Battle Mode is available starting in Chapter 4 after collecting 
      the Nopon Summons from the Challenge Battle Mode Pack of the Expansion Pass. 
      During New Game Plus, it is available before Chapter 4 after collecting the 
      Nopon Summons. Challenge battles are accessible from the Nopon Archsage in the 
      Land of Challenge, which can be accessed via a portal in the Olethro Ruins after 
      Chapter 3. If Jin, Malos, or Vandham is in the active party, the Nopon Archsage 
      will not allow the player to select a Challenge Battle until the character is 
      removed from the active party.`}</p>
      {focus !== 0 ?
        <ChallengeBattleDetails
          challengeBattle={props.challengeBattles.find((cb) => cb.id === focus)}
          updateChallengeStatus={updateChallengeStatus}
          selectChallenge={selectChallenge}
        /> : <div />
      }
      {props.challengeBattles.length === 0 ?
        <>No challenge battles found.</>
        : <>
          <OrderBy
            orderOptions={Object.keys(orderOptions)}
            chosenOrder={orderType}
            changeOrder={setOrderType}
            sortOrderAsc={sortOrderAsc}
            changeSortOrderAsc={setSortOrderAsc.bind(this, !sortOrderAsc)}
          />
          <Table
            columns={['Beaten', 'Available', 'Difficulty', 'MaxLv', 'Waves', 'Name']}
            headerStyles={{
              'Beaten': 'column-narrow',
              'Available': 'column-unrestricted order-title-available',
              'Difficulty': 'column-medium',
              'MaxLv': 'level-column column-narrow order-title-available',
              'Waves': 'level-column column-narrow order-title-available',
              'Name': 'column-unrestricted order-title'
            }}
            rows={props.challengeBattles.sort((cbA, cbB) => {
              const cbAValue = cbA[getOrderTypeColumn(orderType)]
              const cbBValue = cbB[getOrderTypeColumn(orderType)]
              return sortFunction(cbAValue, cbBValue, sortOrderAsc)
            }).map((cb:IChallengeBattleAvailability) => ({
              id: cb.id,
              'Beaten':
                <div className='column-narrow text-list-status'>
                  <OptionsCheckbox
                    hideAvailable={true}
                    available={cb.available}
                    unlocked={cb.beaten}
                    onClick={(beaten) => {
                      if (typeof beaten === 'boolean') {
                        updateChallengeStatus(cb.id, beaten)
                      }
                    }}
                    size='small'
                  />
                </div>,
              'Available':
                <div className='column-narrow available-column text-list-status'>
                  <img
                    src={path.resolve(`images/helper/${cb.available ?
                      'GreenCheckmark' : 'RedX'}.svg`)}
                    alt={cb.name}
                    className="availability-small-image"
                  />
                </div>,
              'Difficulty':
                <div className="column-medium text-list-status">
                  <DifficultyIcons difficulty={cb.difficulty} id={cb.name} />
                </div>,
              'MaxLv':
                <div className='level-column column-narrow text-list-status'>{cb.maxLv}</div>,
              'Waves':
                <div className='level-column column-narrow text-list-status'>{cb.waves}</div>,
              'Name': !props.storyProgress.OnlyShowAvailable || cb.available ?
                <div className="text-list-link hoverPointer" onClick={() => selectChallenge(cb.id)}>
                  {cb.name}
                </div>
                : <div className='text-list-link'><i>Challenge {cb.id}</i></div>,
              preReqs: cb.prerequisites,
              available: cb.available,
              focused: focus === cb.id
            }))}
          />
        </>
      }
    </CollapsibleComponent>
  </>
}