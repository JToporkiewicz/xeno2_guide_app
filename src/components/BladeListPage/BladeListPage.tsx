import { ReactChild, useEffect, useRef, useState } from 'react'
import { IFieldSkills, IStoryProgress } from '../../interfaces';
import { defaultBladeState } from '../../redux/interfaces/blades';
import { IUpdateFieldSkillLevel } from '../../redux/interfaces/fieldSkills';
import { IBladeState, IUpdateShow } from '../../redux/interfaces/reduxState';
import { CharacterPageDetails } from '../CommonComponents/CharacterPageDetails';
import CharacterPanelContainer from '../CommonComponents/Containers/CharacterPanelsContainer';
import CollapsibleComponent from '../CommonComponents/Containers/CollapsibleComponent';
import HeaderContainer from '../CommonComponents/Containers/HeaderContainer';
import IncrementDecrementNumber from '../CommonComponents/FormComponents/IncrementDecrementNumber';
import { ClosedLinkedImagePanel } from '../CommonComponents/ImagePanels/ClosedLinkedImagePanel';
import UnavailableImagePanel from '../UnavailableDataComponents/Images/UnavailableImagePanel';

interface IDispatchProps {
  saveStoryProgress: (payload:IStoryProgress) => void;
  showLoader: (payload:string) => void;
  hideLoader: (payload:string) => void;
  updateShowBlade: (payload:IUpdateShow) => void;
  updateBladeUnlocked: (payload:IBladeState) => void;
  saveBladeStatus: (payload:IBladeState) => void;
  fetchFieldSkills: () => void;
  updateFieldSkillLevelUnlocked: (payload:IUpdateFieldSkillLevel) => void;
  saveFieldSkillLevelUnlocked: (payload:IUpdateFieldSkillLevel) => void;
}

interface IProps {
  blades: IBladeState[];
  storyProgress: IStoryProgress;
  fieldSkills: IFieldSkills[];
}

export const BladeListPageView = (props:IProps&IDispatchProps) => {
  const [bladeList, setBladeList] = useState({} as {[group:string]: ReactChild[]});
  const [orderType, setOrderType] = useState('default');
  const [selectedBlade, setSelectedBlade] = useState(defaultBladeState as IBladeState)
  const toUpdateBlades = useRef([] as IBladeState[]);
  const toUpdateFieldSkills = useRef([] as IUpdateFieldSkillLevel[]);

  const orderOptions: {[key:string]: keyof IBladeState} = {
    default: 'id',
    alphabetically: 'name',
    gender: 'gender',
    weapon: 'weapon',
    element: 'element',
    role: 'role',
    source: 'source',
    availability: 'available'
  }

  const updateBladeAvailability = (blade: IBladeState) => {
    toUpdateBlades.current = toUpdateBlades.current
      .filter((updateBlade) => blade.id !== updateBlade.id)
      .concat({
        ...blade,
        unlocked: !blade.unlocked
      })
    setSelectedBlade({...blade, unlocked: !blade.unlocked})
    props.updateBladeUnlocked({
      ...blade,
      unlocked: !blade.unlocked
    })
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

  const getOrderTypeColumn = (order: string): keyof IBladeState => {
    return orderOptions[order] || orderOptions.default
  }

  useEffect(() => {
    if(props.blades !== undefined) {
      props.showLoader('Update blade list');

      const updateShow = (blade:string) => {
        const bladeDetails = props.blades.find((b) => b.name === blade);
        if (bladeDetails) {
          props.updateShowBlade({id: bladeDetails.id, 'show': !bladeDetails.show})
        }
      }

      setBladeList(
        props.blades.filter((blade) => !blade.name.includes('Awakened'))
          .sort((bladeA, bladeB) => {
            const bladeAValue = bladeA[getOrderTypeColumn(orderType)]
            const bladeBValue = bladeB[getOrderTypeColumn(orderType)]
            if(bladeAValue !== undefined && bladeBValue !== undefined) {
              return bladeAValue < bladeBValue ? -1
                : bladeAValue > bladeBValue ? 1 : 0
            }
            return 0
          })
          .reduce((bladeList, blade) =>{
            const progress = Math.round(blade.affinityChart.branches
              .reduce((skillsTotal, branch) =>
                skillsTotal +
                  (branch.nodes.find((node) => !node.Unlocked)?.SkillLevel
                    || branch.nodes.length + 1) - 1, 0)
                    / blade.affinityChart.branches.reduce((skillsTotal, branch) =>
                      skillsTotal + (branch.nodes.length || -1) + 1, 0) * 10000) / 100
            const group = blade[getOrderTypeColumn(orderType)];
            const groupName = orderType === 'availability' && typeof group === 'boolean' ?
              group ? 'Available' : 'Unavailable' : String(group);
            return {
              ...bladeList,
              [groupName]: (bladeList[groupName] || []).concat(
                props.storyProgress.OnlyShowAvailable &&
                (!blade.available && !blade.show) ?
                  <div className="col-sm-3" key={blade.name}>
                    <UnavailableImagePanel
                      name={blade.name}
                      panelType="blade"
                      id={blade.id}
                      toggleShow={updateShow.bind(this)}
                      updateState={() => {}}
                    />
                  </div>
                  :
                  <ClosedLinkedImagePanel
                    panelType="blade"
                    name={blade.name}
                    id={blade.id}
                    key={blade.name}
                    unlocked={blade.unlocked}
                    selectCharacter={setSelectedBlade.bind(this, blade)}
                    progress={progress}
                  />)
            }}, {} as any)
      )
      props.hideLoader('Update blade list');
    }
  }, [props.blades, orderType])

  useEffect(() => {
    if (props.fieldSkills.length === 0) {
      props.fetchFieldSkills();
    }
    return () => {
      toUpdateBlades.current.forEach((blade:IBladeState) =>
        props.saveBladeStatus(blade)
      )
      toUpdateFieldSkills.current.forEach((skill: IUpdateFieldSkillLevel) =>
        props.saveFieldSkillLevelUnlocked(skill)
      )
    }
  }, [])

  return(
    <>
      {
        selectedBlade !== defaultBladeState ?
          <CharacterPageDetails
            area="blade"
            id={selectedBlade.id}
            name={selectedBlade.name}
            unlocked={`Unlocked: ${selectedBlade.unlocked ? 'Yes' : 'No'}`}
            availability={`Available: ${selectedBlade.available ? 'Yes' : 'No'}`}
            list={[{
              label: 'Skills: ',
              unlocked: selectedBlade.affinityChart.branches
                .reduce((skillsTotal, branch) =>
                  skillsTotal + (branch.nodes.find((node) => !node.Unlocked)?.SkillLevel
                    || branch.nodes.length + 1) - 1, 0),
              total: selectedBlade.affinityChart.branches.reduce((skillsTotal, branch) =>
                skillsTotal + (branch.nodes.length || -1) + 1, 0)
            }]}
            onClose={setSelectedBlade.bind(this, defaultBladeState)}
            unlockButton
            onUnlock={updateBladeAvailability.bind(this, selectedBlade)}
          />
          : undefined
      }
      <HeaderContainer title="Blades" />
      <CharacterPanelContainer
        title="Blades"
        orderOptions={Object.keys(orderOptions)}
        orderType={orderType}
        setOrderType={setOrderType}
      >
        {orderType === 'default' || orderType === 'alphabetically' ?
          Object.entries(bladeList).flatMap((group) => group[1])
          : bladeList}
      </CharacterPanelContainer>
      <CollapsibleComponent header='Field Skill Levels'>
        <>
          <div className='row'>
            <div className='col-sm-2'><b>Name</b></div>
            | <div className='col-sm-2'><b>Type</b></div>
            | <div className='col-sm-3'><b>Common Blade Contribution</b></div>
            | <div className='col-sm-2'><b>Total Level</b></div>
          </div>
          {props.fieldSkills.map((skills) =>
            <div className='row' key={skills.Name}>
              <div className='col-sm-2'>{skills.Name}</div>
              | <div className='col-sm-2'>{skills.Type}</div>
              |
              <div className='col-sm-3'>
                <IncrementDecrementNumber
                  value={skills.CommonBladeContribution}
                  minimum={0}
                  updateValue={updateSkillLevelUnlocked.bind(this, skills.id)}
                />
              </div>
              | <div className='col-sm-2'>{skills.TotalLevel}</div>
            </div>
          )}
        </>
      </CollapsibleComponent>
    </>
  )
}