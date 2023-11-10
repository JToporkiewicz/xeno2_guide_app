import { useState, useEffect, ReactChild } from 'react';
import CharacterPanelContainer from '../CommonComponents/Containers/CharacterPanelsContainer';
import { ClosedLinkedImagePanel } from '../CommonComponents/ImagePanels/ClosedLinkedImagePanel';
import HeaderContainer from '../CommonComponents/Containers/HeaderContainer';
import UnavailableImagePanel from '../UnavailableDataComponents/Images/UnavailableImagePanel';
import { IStoryProgress } from 'interfaces';
import { IDriverState, IUpdateShow } from 'reduxState/interfaces/reduxState';
import { CharacterPageDetails } from '../CommonComponents/CharacterPageDetails';
import { defaultDriverState } from 'reduxState/interfaces/drivers';
import { sortFunction } from 'helpers';
import { getDACompletion, getDSCompletion } from 'helpers/completionPercentage';
import { Routes } from 'helpers/routesConst';

interface IDispatchProps {
  saveStoryProgress: (payload:IStoryProgress) => void;
  showLoader: (payload:string) => void;
  hideLoader: (payload:string) => void;
  updateShowDriver: (payload:IUpdateShow) => void;
  fetchAllDrivers: () => void;
}

interface IProps {
  drivers: IDriverState[];
  storyProgress: IStoryProgress;
}

export const DriversListPageView = (props:IProps & IDispatchProps) => {
  const [driversList, setDriverList] = useState([] as ReactChild[]);
  const [orderType, setOrderType] = useState('default');
  const [sortOrderAsc, setSortOrderAsc] = useState(true);
  const [selectedDriver, setSelectedDriver] = useState(defaultDriverState as IDriverState);

  const orderOptions: {[key:string]: keyof IDriverState} = {
    default: 'id',
    alphabetically: 'name',
    chapter: 'chapterUnlocked'
  }
  
  const getOrderTypeColumn = (order: string): keyof IDriverState => {
    return orderOptions[order] || orderOptions.default
  }

  useEffect(() => {
    if(props.drivers !== undefined){
      props.showLoader('Update driver list');

      const updateShow = (driver:string) => {
        const driverDetails = props.drivers.find((d) => d.name === driver);
        if (driverDetails) {
          props.updateShowDriver({id: driverDetails.id, 'show': !driverDetails.show})
        }
      }

      const updateGameState = (entryId:number) => {
        const driver = props.drivers.find(d => d.id === entryId);
        if(driver) {
          props.saveStoryProgress({...props.storyProgress,
            Chapter: driver.chapterUnlocked})
        }
      }

      setDriverList(
        props.drivers
          .sort((driverA, driverB) => {
            const driverAValue = driverA[getOrderTypeColumn(orderType)]
            const driverBValue = driverB[getOrderTypeColumn(orderType)]
            return sortFunction(driverAValue, driverBValue, sortOrderAsc)
          })
          .map((driver) => {
            const artCompletion = getDACompletion(driver.arts)
            const skillTreeCompletion = getDSCompletion(driver.skillTree)
            const hiddenTreeCompletion = getDSCompletion(driver.hiddenSkillTree)
            const progress=Math.round((artCompletion.unlocked
              + skillTreeCompletion.unlocked
              + hiddenTreeCompletion.unlocked
            )/(artCompletion.total
              + skillTreeCompletion.total
              + hiddenTreeCompletion.total) * 10000) / 100
            return props.storyProgress.OnlyShowAvailable &&
              (driver.chapterUnlocked > props.storyProgress.Chapter && !driver.show) ? 
              <div className="col-sm-3" key={driver.name}>
                <UnavailableImagePanel
                  name={driver.name}
                  panelType="driver"
                  id={driver.id}
                  toggleShow={updateShow.bind(this)}
                  updateState={updateGameState.bind(this)}
                />
              </div>
              :
              <ClosedLinkedImagePanel
                panelType="driver"
                name={driver.name}
                id={driver.id}
                key={driver.name}
                selectCharacter={setSelectedDriver.bind(this, driver)}
                progress={progress}
              />
          })
      )

      props.hideLoader('Update driver list')
    }
  }, [props.drivers, orderType, sortOrderAsc])


  return(
    <>
      {
        selectedDriver !== defaultDriverState ?
          <CharacterPageDetails
            area="driver"
            link={Routes.DRIVER + selectedDriver.id}
            id={selectedDriver.id}
            name={selectedDriver.name}
            availability={`Available from chapter: ${selectedDriver.chapterUnlocked}`}
            list={[
              {
                label: 'Arts: ',
                ...getDACompletion(selectedDriver.arts)
              },
              {
                label: 'Skills: ',
                ...getDSCompletion(selectedDriver.skillTree)
              },
              {
                label: 'Hidden Skills: ',
                ...getDSCompletion(selectedDriver.hiddenSkillTree)
              },
            ]}
            onClose={setSelectedDriver.bind(this, defaultDriverState)}
          />
          : undefined
      }
      <HeaderContainer title="Drivers" refreshData={props.fetchAllDrivers}/>
      <CharacterPanelContainer
        title="Drivers"
        orderOptions={Object.keys(orderOptions)}
        orderType={orderType}
        setOrderType={setOrderType}
        sortOrderAsc={sortOrderAsc}
        changeSortOrderAsc={setSortOrderAsc.bind(this, !sortOrderAsc)}  
      >
        {driversList}
      </CharacterPanelContainer>
    </>
  )
}
