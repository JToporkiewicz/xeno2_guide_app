import CollapsibleComponent from 'components/CommonComponents/Containers/CollapsibleComponent';
import HeaderContainer from 'components/CommonComponents/Containers/HeaderContainer';
import { OptionsCheckbox } from 'components/CommonComponents/FormComponents/OptionsCheckbox';
import { IMonster, IMonsterDrops } from 'interfaces';
import path from 'path';
import { useEffect, useRef } from 'react';
import { IUpdateMonster } from 'reduxState/interfaces/monsters';
import { IUpdateUnlocked } from 'reduxState/interfaces/reduxState';

interface IProps {
  monster: IMonster
}

interface IDispatchProps {
  updateMonsterStatus: (input:IUpdateMonster) => void;
  saveMonsterStatus: (input:IUpdateUnlocked) => void;
  fetchMonster: (input: number) => void;
}

export const MonsterDetailsPageView = (props:IProps & IDispatchProps) => {
  const {monster} = props;
  const monToUpdate = useRef(undefined as IMonster | undefined);

  const updateMonCompleted = () => {
    if (monster) {
      monToUpdate.current = {
        ...monster,
        Beaten: !monster.Beaten
      }

      props.updateMonsterStatus({
        id: monster.id,
        beaten: !monster.Beaten
      })
    }
  }

  useEffect(() => {
    return () => {
      if (monToUpdate.current) {
        props.saveMonsterStatus({
          [monToUpdate.current.Beaten ? 'unlocked' : 'locked']: [monToUpdate.current.id]
        })
      }
    }
  }, [])

  return <>
    <HeaderContainer
      title={monster.Name}
      refreshData={props.fetchMonster}
      refreshDataId={monster.id}
    />
    <CollapsibleComponent header='Monster Details'>
      <div className='row'>
        <div className='col-sm-4'>
          {['Unique'].includes(monster.Category) ?
            <OptionsCheckbox
              title='Completed: '
              available={monster.Available}
              unlocked={monster.Beaten}
              onClick={updateMonCompleted}
            />
            : <div className='centered'>
              <p>
                <b>Available: </b>
                <img 
                  src={path.resolve(`images/helper/${monster.Available ?
                    'GreenCheckmark' : 'RedX'}.svg`)}
                  alt={'Availability'}
                  className="availability-small-image inline-image"
                />
              </p>
            </div>
          }
          <div className='centered'>
            <p>
              <b>DLC required: </b>
              <img 
                src={path.resolve(`images/helper/${monster.DLCRequired ?
                  'GreenCheckmark' : 'RedX'}.svg`)}
                alt={'DLCRequired'}
                className="availability-small-image inline-image"
              />
            </p>
          </div>
          <div className='centered'>
            <p>
              <b>Is driver: </b>
              <img 
                src={path.resolve(`images/helper/${monster.IsDriver ?
                  'GreenCheckmark' : 'RedX'}.svg`)}
                alt={'IsDriver'}
                className="availability-small-image inline-image"
              />
            </p>
          </div>
        </div>
        <div className='col-sm-4'>
          <p>
            <b>{monster.HighestLevel ? 'Levels' : 'Level'}: </b>
            {monster.LowestLevel}
            {monster.HighestLevel ? ` - ${monster.HighestLevel}` : ''}
          </p>
          <p><b>Category:</b> {monster.Category}</p>
          <p><b>Type:</b> {monster.Type}</p>
        </div>
        <div className='col-sm-4'>
          <p>Location:<b> {monster.Location}</b></p>
          <p>Area:<b> {monster.Area.replace('(', '').replace(')', '')}</b></p>
          <p>Spawn Condition:<b> {monster.SpawnCondition}</b></p>
        </div>
      </div>
    </CollapsibleComponent>
    {monster.Drops && monster.Drops.length > 0 ?
      <CollapsibleComponent header='Drops'>
        <div className='data-table'>
          <div className='row monster-drops-table'>
            <b className='column-wide order-title'>Name</b>
            <b className='column-medium order-title'>Type</b>
            <b className='column-medium order-title'>Drop rate</b>
            <b className='column-wide order-title'>Rarity</b>
          </div>
          <div className='table-outline monster-drops-table'>
            {monster.Drops.map((drop: IMonsterDrops, id: number) =>
              <div className="row text-list-entry" key={id}>
                <div className='column-wide text-list-status'>
                  {drop.name}
                </div>
                <div className='column-medium text-list-status'>
                  {drop.type}
                </div>
                <div className='column-medium text-list-status'>
                  {drop.dropRate}
                </div>
                <div className='column-wide'>
                  {drop.rarity}
                </div>
              </div>
            )}
          </div>
        </div>
      </CollapsibleComponent>
      : <div />
    }
  </>
}