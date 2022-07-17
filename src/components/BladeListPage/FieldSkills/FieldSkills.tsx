import { useEffect, useRef, useState } from 'react'
import { IFieldSkills } from '../../../interfaces';
import { IUpdateFieldSkillLevel } from '../../../redux/interfaces/fieldSkills';
import CollapsibleComponent from '../../CommonComponents/Containers/CollapsibleComponent';
import IncrementDecrementNumber
  from '../../CommonComponents/FormComponents/IncrementDecrementNumber';

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
  const [isOrderAsc, setIsOrderAsc] = useState(false);
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

  const getSortIcon = (title: string) => {
    return <img
      src={`images/helper/${
        title !== orderType ? 'SortBoth'
          : isOrderAsc ? 'SortAscending' : 'SortDescending'
      }.svg`}
      alt={`sort${title}`}
      className='sort-icon'
      onClick={() => {
        if (title === orderType) {
          setIsOrderAsc(!isOrderAsc)
        }
        else {
          setOrderType(title)
          setIsOrderAsc(true)
        }
      }}
    />
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
        <div className='row field-title'>
          <div className='col-sm-1'>
            <b>Id</b>
            {getSortIcon('default')}
          </div>
          <div className='col-sm-2'>
            <b>Name</b>
            {getSortIcon('name')}
          </div>
          <div className='col-sm-2'>
            <b>Type</b>
            {getSortIcon('type')}
          </div>
          <div className='col-sm-4'>
            <b>Common Blade Contribution</b>
            {getSortIcon('commonBlade')}
          </div>
          <div className='col-sm-3'>
            <b>Total Level</b>
            {getSortIcon('total')}
          </div>
        </div>
        <div className='field-skills'>
          {props.fieldSkills
            .sort((skillA, skillB) => {
              const skillAValue = skillA[getOrderTypeColumn(orderType)]
              const skillBValue = skillB[getOrderTypeColumn(orderType)]
              if (skillAValue != undefined && skillBValue != undefined) {
                return skillAValue < skillBValue && !isOrderAsc
                  || skillAValue > skillBValue && isOrderAsc ? -1
                  : skillAValue > skillBValue && !isOrderAsc
                  || skillAValue < skillBValue && isOrderAsc ? 1 : 0
              }
              return 0
            })
            .map((skills) =>
              <div className='field-row' key={skills.Name}>
                <div className='col-sm-1 field-entry'>{skills.id}</div>
                <div className='col-sm-2 field-entry'>{skills.Name}</div>
                <div className='col-sm-2 field-entry'>{skills.Type}</div>
                <div className='col-sm-4 field-entry'>
                  <IncrementDecrementNumber
                    value={skills.CommonBladeContribution}
                    minimum={0}
                    updateValue={updateSkillLevelUnlocked.bind(this, skills.id)}
                  />
                </div>
                <div className='col-sm-3 field-entry'>{skills.TotalLevel}</div>
              </div>
            )}
        </div>
      </>
    </CollapsibleComponent>
  )
}