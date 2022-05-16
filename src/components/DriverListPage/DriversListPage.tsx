import { useState, useEffect, ReactChild } from 'react';
import CharacterPanelContainer from '../CommonComponents/Containers/CharacterPanelsContainer';
import { ClosedLinkedImagePanel } from '../CommonComponents/ImagePanels/ClosedLinkedImagePanel';
import HeaderContainer from '../CommonComponents/Containers/HeaderContainer';
import UnavailableImagePanel from '../UnavailableDataComponents/Images/UnavailableImagePanel';
import { IStoryProgress } from '../../interfaces';
import { IDriverState, IUpdateShow } from '../../redux/interfaces/reduxState';

interface IDispatchProps {
  saveStoryProgress: (payload:IStoryProgress) => void;
  showLoader: (payload:string) => void;
  hideLoader: (payload:string) => void;
  updateShowDriver: (payload:IUpdateShow) => void;
}

interface IProps {
  drivers: IDriverState[];
  storyProgress: IStoryProgress;
}

export const DriversListPageView = (props:IProps & IDispatchProps) => {
  const [driversList, setDriverList] = useState([] as ReactChild[]);
  const [orderType, setOrderType] = useState('default');

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
            if(driverAValue !== undefined && driverBValue !== undefined) {
              return driverAValue < driverBValue ? -1
                : driverAValue > driverBValue ? 1 : 0
            }
            return 0
          })
          .map((driver) =>
            props.storyProgress.OnlyShowAvailable &&
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
              />
          )
      )

      props.hideLoader('Update driver list')
    }
  }, [props.drivers, orderType])


  return(
    <>
      <HeaderContainer title="Drivers"/>
      <CharacterPanelContainer
        title="Drivers"
        orderOptions={Object.keys(orderOptions)}
        orderType={orderType}
        setOrderType={setOrderType}
      >
        {driversList}
      </CharacterPanelContainer>
    </>
  )
}
