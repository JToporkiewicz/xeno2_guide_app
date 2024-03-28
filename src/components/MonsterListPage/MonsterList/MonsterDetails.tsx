import { OptionsCheckbox } from 'components/CommonComponents/FormComponents/OptionsCheckbox';
import Table from 'components/CommonComponents/Table';
import { IMonsterDrops } from 'interfaces';
import path from 'path';
import { IMonsterAvailability } from 'reduxState/interfaces/availabilityState'

interface IOwnProps {
  monster: IMonsterAvailability | undefined;
  updateMonStatus: (monId: number, beaten: boolean) => void;
  selectMonster: (id: number) => void;
}

export const MonsterDetails = (props: IOwnProps) => {
  const {monster, updateMonStatus} = props;
  if (!monster) {
    return <div />
  }

  return <>
    <div>
      <img
        src={path.resolve('images/helper/Close.svg')}
        alt="close"
        className="close-details"
        onClick={() => props.selectMonster(0)}
      />
      <h3>{monster.Name}</h3>
      <div className='row'>
        <div className='col-sm-4'>
          {['Unique'].includes(monster.Category) ?
            <OptionsCheckbox
              title='Completed: '
              available={monster.Available}
              unlocked={monster.Beaten}
              onClick={() => updateMonStatus(monster.id, !monster.Beaten)}
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
      {monster.Drops && monster.Drops.length > 0 ?
        <>
          <hr className='item-details-line'/>
          <b>Drops:</b>
          <Table
            columns={['Name', 'Type', 'Drop rate', 'Rarity']}
            headerStyles={{
              'Name': 'column-wide',
              'Type': 'column-medium order-title',
              'Drop rate': 'column-medium order-title',
              'Rarity': 'column-wide order-title'
            }}
            tableStyle='monster-drops-table'
            rows={monster.Drops.map((drop: IMonsterDrops, id: number) => ({
              id: 'drop ' + id,
              'Name': <div className='column-wide text-list-status'>{drop.name}</div>,
              'Type': <div className='column-medium text-list-status'>{drop.type}</div>,
              'Drop rate': <div className='column-medium text-list-status'>{drop.dropRate}</div>,
              'Rarity': <div className='column-wide'>{drop.rarity}</div>
            }))}
          />
        </>
        : <div />
      }
    </div>
    <hr />
  </>
}