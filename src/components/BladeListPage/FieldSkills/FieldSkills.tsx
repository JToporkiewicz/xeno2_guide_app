import { sortFunction } from 'helpers';
import { useEffect, useRef, useState } from 'react'
import { IFieldSkills } from 'interfaces';
import { IUpdateFieldSkillLevel } from 'reduxState/interfaces/fieldSkills';
import CollapsibleComponent from 'components/CommonComponents/Containers/CollapsibleComponent';
import IncrementDecrementNumber
  from 'components/CommonComponents/FormComponents/IncrementDecrementNumber';
import OrderBy from 'components/CommonComponents/OrderBy';

interface IDispatchProps {
  fetchFieldSkills: () => void;
  updateFieldSkillLevelUnlocked: (payload:IUpdateFieldSkillLevel) => void;
  saveFieldSkillLevelUnlocked: (payload:IUpdateFieldSkillLevel) => void;
}

interface IProps {
  fieldSkills: IFieldSkills[];
}

export const FieldSkillsView = (props:IProps&IDispatchProps) => {
  const [orderType, setOrderType] = useState('default');
  const [isOrderAsc, setIsOrderAsc] = useState(true);
  const toUpdateFieldSkills = useRef([] as IUpdateFieldSkillLevel[]);

  const orderOptions: {[key:string]: keyof IFieldSkills} = {
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

  const getOrderTypeColumn = (order: string): keyof IFieldSkills => {
    return orderOptions[order] || orderOptions.default
  }

  useEffect(() => {
    if (props.fieldSkills.length === 0) {
      props.fetchFieldSkills();
    }
    return () => {
      toUpdateFieldSkills.current.forEach((skill: IUpdateFieldSkillLevel) =>
        props.saveFieldSkillLevelUnlocked(skill)
      )
    }
  }, [])

  return(
    <CollapsibleComponent header='Field Skill Levels'>
      <>
        <OrderBy
          id='field'
          orderOptions={Object.keys(orderOptions)}
          chosenOrder={orderType}
          changeOrder={setOrderType}
          sortOrderAsc={isOrderAsc}
          changeSortOrderAsc={setIsOrderAsc.bind(this, !isOrderAsc)}  
        />
        <div className='data-table'>
          <div className='row field-title'>
            <div className='column-wide'>
              <b>Name</b>
            </div>
            <div className='column-medium'>
              <b>Type</b>
            </div>
            <div className='column-very-wide'>
              <b>Common Blade Contribution</b>
            </div>
            <div className='column-wide'>
              <b>Total Level</b>
            </div>
          </div>
          <div className='field-skills table-outline'>
            {props.fieldSkills
              .sort((skillA, skillB) => {
                const skillAValue = skillA[getOrderTypeColumn(orderType)]
                const skillBValue = skillB[getOrderTypeColumn(orderType)]
                return sortFunction(skillAValue, skillBValue, isOrderAsc)
              })
              .map((skills) =>
                <div className='row text-list-entry' key={skills.Name}>
                  <div className='column-wide text-list-status'>{skills.Name}</div>
                  <div className='column-medium text-list-status'>{skills.Type}</div>
                  <div className='column-very-wide text-list-status'>
                    <div className='centered'>
                      <IncrementDecrementNumber
                        value={skills.CommonBladeContribution}
                        minimum={0}
                        updateValue={updateSkillLevelUnlocked.bind(this, skills.id)}
                      />
                    </div>
                  </div>
                  <div className='column-wide'>{skills.TotalLevel}</div>
                </div>
              )}
          </div>
        </div>
      </>
    </CollapsibleComponent>
  )
}