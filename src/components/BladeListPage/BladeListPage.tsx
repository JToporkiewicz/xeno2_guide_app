import { sortFunction } from 'helpers';
import { ReactChild, useEffect, useRef, useState } from 'react'
import { IStoryProgress } from 'interfaces';
import { defaultBladeAvailability } from 'reduxState/interfaces/blades';
import { IBladeState, IUpdateShow, IUpdateUnlocked } from 'reduxState/interfaces/reduxState';
import { CharacterPageDetails } from 'components/CommonComponents/CharacterPageDetails';
import CharacterPanelContainer
  from 'components/CommonComponents/Containers/CharacterPanelsContainer';
import HeaderContainer from 'components/CommonComponents/Containers/HeaderContainer';
import { ClosedLinkedImagePanel }
  from 'components/CommonComponents/ImagePanels/ClosedLinkedImagePanel';
import UnavailableImagePanel
  from 'components/UnavailableDataComponents/Images/UnavailableImagePanel';
import { FieldSkills } from './FieldSkills';
import { getACCompletion } from 'helpers/completionPercentage';
import { Routes } from 'helpers/routesConst';
import { IBladeAvailability } from 'reduxState/interfaces/availabilityState';

interface IDispatchProps {
  showLoader: (payload:string) => void;
  hideLoader: (payload:string) => void;
  updateShowBlade: (payload:IUpdateShow) => void;
  updateBladeUnlocked: (payload:IBladeState | IBladeAvailability) => void;
  saveBladeStatus: (payload:IUpdateUnlocked) => void;
  fetchAllBlades: () => void;
  fetchFieldSkills: () => void;
}

interface IProps {
  blades: IBladeAvailability[];
  storyProgress: IStoryProgress;
}

export const BladeListPageView = (props:IProps&IDispatchProps) => {
  const [bladeList, setBladeList] = useState({} as {[group:string]: ReactChild[]});
  const [orderType, setOrderType] = useState('default');
  const [sortOrderAsc, setSortOrderAsc] = useState(true);
  const [selectedBlade, setSelectedBlade] = useState(defaultBladeAvailability as IBladeAvailability)
  const toUpdateBlades = useRef([] as IBladeAvailability[]);

  const orderOptions: {[key:string]: keyof IBladeAvailability | 'completion'} = {
    default: 'id',
    alphabetically: 'name',
    gender: 'gender',
    weapon: 'weapon',
    element: 'element',
    role: 'role',
    source: 'source',
    availability: 'available',
    completion: 'completion'
  }

  const updateBladeAvailability = (blade: IBladeAvailability) => {
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

  const getOrderTypeColumn = (order: string): keyof IBladeAvailability | 'completion' => {
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
        props.blades
          .sort((bladeA, bladeB) => {
            const sort = getOrderTypeColumn(orderType);
            let bladeAValue;
            let bladeBValue;
            if (sort === 'completion') {
              const bladeACompletion = getACCompletion(bladeA.affinityChart);
              bladeAValue =
                bladeACompletion.unlocked / bladeACompletion.total * 100;
              const bladeBCompletion = getACCompletion(bladeB.affinityChart);
              bladeBValue =
                bladeBCompletion.unlocked / bladeBCompletion.total * 100;
            } else {
              bladeAValue = bladeA[sort]
              bladeBValue = bladeB[sort]
            }
            return sortFunction(bladeAValue, bladeBValue, sortOrderAsc)  
          })
          .reduce((bladeList, blade) => {
            const acCompletion = getACCompletion(blade.affinityChart)
            const progress = Math.round(acCompletion.unlocked
                    / acCompletion.total * 10000) / 100
            const sort = getOrderTypeColumn(orderType);
            const group = sort !== 'completion' ? blade[sort] : undefined;
            const groupName = orderType === 'availability' && typeof group === 'boolean' ?
              group ? 'Available' : 'Unavailable' : String(group);
            return {
              ...bladeList,
              [groupName]: (bladeList[groupName] || []).concat(
                props.storyProgress.OnlyShowAvailable &&
                (!blade.available && !blade.show) ?
                  <UnavailableImagePanel
                    name={blade.name}
                    panelType="blade"
                    id={blade.id}
                    toggleShow={updateShow.bind(this)}
                    updateState={() => {}}
                  />
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
  }, [props.blades, orderType, sortOrderAsc, props.storyProgress])

  useEffect(() => {
    return () => {
      if (toUpdateBlades.current) {
        props.saveBladeStatus({
          unlocked: toUpdateBlades.current
            .filter((blade) => blade.unlocked).map((blade) => blade.id),
          locked: toUpdateBlades.current
            .filter((blade) => !blade.unlocked).map((blade) => blade.id)
        })
      }
    }
  }, [])

  return(
    <>
      {
        selectedBlade !== defaultBladeAvailability ?
          <CharacterPageDetails
            area="blade"
            link={Routes.BLADE + selectedBlade.id}
            id={selectedBlade.id}
            name={selectedBlade.name}
            unlocked={`Unlocked: ${selectedBlade.unlocked ? 'Yes' : 'No'}`}
            availability={`Available: ${selectedBlade.available ? 'Yes' : 'No'}`}
            list={[{
              label: 'Skills: ',
              ...getACCompletion(selectedBlade.affinityChart)
            }]}
            onClose={setSelectedBlade.bind(this, defaultBladeAvailability)}
            unlockButton
            onUnlock={updateBladeAvailability.bind(this, selectedBlade)}
            preReqs={selectedBlade.prerequisites}
          />
          : undefined
      }
      <HeaderContainer
        title="Blades"
        refreshData={() => {
          props.fetchAllBlades()
          props.fetchFieldSkills()
        }} />
      <CharacterPanelContainer
        title="Blades"
        orderOptions={Object.keys(orderOptions)}
        orderType={orderType}
        setOrderType={setOrderType}
        sortOrderAsc={sortOrderAsc}
        changeSortOrderAsc={setSortOrderAsc.bind(this, !sortOrderAsc)}
      >
        {orderType === 'default' || orderType === 'completion'
          ? Object.entries(bladeList).sort((bladeA, bladeB) => {
            return sortFunction(bladeA[0], bladeB[1], sortOrderAsc)
          }).flatMap((group) => group[1])
          : orderType === 'alphabetically' ?
            Object.entries(bladeList).flatMap((group) => group[1])
            : bladeList}
      </CharacterPanelContainer>
      <FieldSkills/>
    </>
  )
}