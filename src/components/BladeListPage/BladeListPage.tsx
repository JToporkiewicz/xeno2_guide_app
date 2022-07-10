import { ReactChild, useEffect, useRef, useState } from 'react'
import { IStoryProgress } from '../../interfaces';
import { defaultBladeState } from '../../redux/interfaces/blades';
import { IBladeState, IUpdateShow } from '../../redux/interfaces/reduxState';
import { CharacterPageDetails } from '../CommonComponents/CharacterPageDetails';
import CharacterPanelContainer from '../CommonComponents/Containers/CharacterPanelsContainer';
import HeaderContainer from '../CommonComponents/Containers/HeaderContainer';
import { ClosedLinkedImagePanel } from '../CommonComponents/ImagePanels/ClosedLinkedImagePanel';
import UnavailableImagePanel from '../UnavailableDataComponents/Images/UnavailableImagePanel';

interface IDispatchProps {
  saveStoryProgress: (payload:IStoryProgress) => void;
  showLoader: (payload:string) => void;
  hideLoader: (payload:string) => void;
  updateShowBlade: (payload:IUpdateShow) => void;
  updateBladeUnlocked: (payload:IBladeState) => void;
  saveBladeStatus: (payload:IBladeState) => void;
}

interface IProps {
  blades: IBladeState[];
  storyProgress: IStoryProgress;
}

export const BladeListPageView = (props:IProps&IDispatchProps) => {
  const [bladeList, setBladeList] = useState({} as {[group:string]: ReactChild[]});
  const [orderType, setOrderType] = useState('default');
  const [selectedBlade, setSelectedBlade] = useState(defaultBladeState as IBladeState)
  const toUpdate = useRef([] as IBladeState[]);

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
    toUpdate.current = toUpdate.current
      .filter((updateBlade) => !(blade.id === updateBlade.id))
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
    return () => {
      toUpdate.current.forEach((blade:IBladeState) =>
        props.saveBladeStatus(blade)
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
    </>
  )
}