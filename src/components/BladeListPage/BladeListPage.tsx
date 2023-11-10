import { sortFunction } from 'helpers';
import { ReactChild, useEffect, useRef, useState } from 'react'
import { IStoryProgress } from 'interfaces';
import { defaultBladeState } from 'reduxState/interfaces/blades';
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

interface IDispatchProps {
  showLoader: (payload:string) => void;
  hideLoader: (payload:string) => void;
  updateShowBlade: (payload:IUpdateShow) => void;
  updateBladeUnlocked: (payload:IBladeState) => void;
  saveBladeStatus: (payload:IUpdateUnlocked) => void;
  fetchAllBlades: () => void;
  fetchFieldSkills: () => void;
}

interface IProps {
  blades: IBladeState[];
  storyProgress: IStoryProgress;
}

export const BladeListPageView = (props:IProps&IDispatchProps) => {
  const [bladeList, setBladeList] = useState({} as {[group:string]: ReactChild[]});
  const [orderType, setOrderType] = useState('default');
  const [sortOrderAsc, setSortOrderAsc] = useState(true);
  const [selectedBlade, setSelectedBlade] = useState(defaultBladeState as IBladeState)
  const toUpdateBlades = useRef([] as IBladeState[]);

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
            return sortFunction(bladeAValue, bladeBValue, sortOrderAsc)
          })
          .reduce((bladeList, blade) => {
            const acCompletion = getACCompletion(blade.affinityChart)
            const progress = Math.round(acCompletion.unlocked
                    / acCompletion.total * 10000) / 100
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
  }, [props.blades, orderType, sortOrderAsc])

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
        selectedBlade !== defaultBladeState ?
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
            onClose={setSelectedBlade.bind(this, defaultBladeState)}
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
        {orderType === 'default' ? Object.entries(bladeList).sort((bladeA, bladeB) => {
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