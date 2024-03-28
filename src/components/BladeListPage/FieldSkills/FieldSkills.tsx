import { sortFunction } from 'helpers';
import { useEffect, useRef, useState } from 'react'
import { IFieldSkillsTotal } from 'interfaces';
import { IUpdateFieldSkillLevel } from 'reduxState/interfaces/fieldSkills';
import CollapsibleComponent from 'components/CommonComponents/Containers/CollapsibleComponent';
import IncrementDecrementNumber
  from 'components/CommonComponents/FormComponents/IncrementDecrementNumber';
import OrderBy from 'components/CommonComponents/OrderBy';
import Table from 'components/CommonComponents/Table';

interface IDispatchProps {
  fetchFieldSkills: () => void;
  updateFieldSkillLevelUnlocked: (payload:IUpdateFieldSkillLevel) => void;
  saveFieldSkillLevelUnlocked: (payload:IUpdateFieldSkillLevel[]) => void;
}

interface IProps {
  fieldSkills: IFieldSkillsTotal[];
}

export const FieldSkillsView = (props:IProps&IDispatchProps) => {
  const [orderType, setOrderType] = useState('default');
  const [isOrderAsc, setIsOrderAsc] = useState(true);
  const toUpdateFieldSkills = useRef([] as IUpdateFieldSkillLevel[]);

  const orderOptions: {[key:string]: keyof IFieldSkillsTotal} = {
    default: 'id',
    name: 'Name',
    type: 'Type',
    commonBlade: 'CommonBladeContribution',
    total: 'TotalLevel'
  }

  const updateSkillLevelUnlocked = (id:number, value:number) => {
    props.updateFieldSkillLevelUnlocked({
      id,
      CommonBladeContribution: value
    })
    toUpdateFieldSkills.current = toUpdateFieldSkills.current
      .filter((updateSkill) => updateSkill.id !== id)
      .concat({
        id,
        CommonBladeContribution: value
      });
  }

  const getOrderTypeColumn = (order: string): keyof IFieldSkillsTotal => {
    return orderOptions[order] || orderOptions.default
  }

  useEffect(() => {
    if (props.fieldSkills.length === 0) {
      props.fetchFieldSkills();
    }
    return () => {
      if (toUpdateFieldSkills.current.length) {
        props.saveFieldSkillLevelUnlocked(toUpdateFieldSkills.current)
      }
    }
  }, [])

  return(
    <CollapsibleComponent header='Field Skill Levels'>
      <>
        <OrderBy
          orderOptions={Object.keys(orderOptions)}
          chosenOrder={orderType}
          changeOrder={setOrderType}
          sortOrderAsc={isOrderAsc}
          changeSortOrderAsc={setIsOrderAsc.bind(this, !isOrderAsc)}  
        />
        <Table
          columns={['Name', 'Type', 'Common Blade Contribution', 'Total Level']}
          rows={props.fieldSkills.sort((skillA, skillB) => {
            const skillAValue = skillA[getOrderTypeColumn(orderType)]
            const skillBValue = skillB[getOrderTypeColumn(orderType)]
            return sortFunction(skillAValue, skillBValue, isOrderAsc)
          }).map((skills) => ({
            'id': skills.id,
            'Name': <div className='column-wide text-list-status'>{skills.Name}</div>,
            'Type': <div className='column-medium text-list-status'>{skills.Type}</div>,
            'Common Blade Contribution':
              <div className='column-very-wide text-list-status'>
                <div className='centered'>
                  <IncrementDecrementNumber
                    value={skills.CommonBladeContribution}
                    minimum={0}
                    updateValue={updateSkillLevelUnlocked.bind(this, skills.id)}
                  />
                </div>
              </div>,
            'Total Level': <div className='column-wide'>{skills.TotalLevel}</div>
          }))}
          headerStyles={{
            'Name': 'column-wide',
            'Type': 'column-medium',
            'Common Blade Contribution': 'column-very-wide',
            'Total Level': 'column-wide'
          }}
        />
      </>
    </CollapsibleComponent>
  )
}