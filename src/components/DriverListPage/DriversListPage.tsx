import { useState, useEffect, ReactChild } from 'react';
import CharacterPanelContainer from '../CommonComponents/Containers/CharacterPanelsContainer';
import { ClosedLinkedImagePanel } from '../CommonComponents/ImagePanels/ClosedLinkedImagePanel';
import HeaderContainer from '../CommonComponents/Containers/HeaderContainer';
import UnavailableImagePanel from '../UnavailableDataComponents/Images/UnavailableImagePanel';
import { IStoryProgress } from '../../interfaces';
import { IDriverState, IUpdateShow } from '../../redux/interfaces/reduxState';
import { CharacterPageDetails } from '../CommonComponents/CharacterPageDetails';
import { defaultDriverState } from '../../redux/interfaces/drivers';

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
            if(driverAValue !== undefined && driverBValue !== undefined) {
              return driverAValue < driverBValue ? -1
                : driverAValue > driverBValue ? 1 : 0
            }
            return 0
          })
          .map((driver) => {
            const progress=Math.round((driver.arts
              .reduce((artTotal, art) => artTotal + art.levelUnlocked, 0)
              + driver.skillTree.tier1.filter((node) => node.Unlocked).length
              + driver.skillTree.tier2.filter((node) => node.Unlocked).length
              + driver.skillTree.tier3.filter((node) => node.Unlocked).length
              + driver.hiddenSkillTree.tier1.filter((node) => node.Unlocked).length
              + driver.hiddenSkillTree.tier2.filter((node) => node.Unlocked).length
              + driver.hiddenSkillTree.tier3.filter((node) => node.Unlocked).length
            )/(driver.arts.length * 6
              + driver.skillTree.tier1.length
              + driver.skillTree.tier2.length
              + driver.skillTree.tier3.length
              + driver.hiddenSkillTree.tier1.length
              + driver.hiddenSkillTree.tier2.length
              + driver.hiddenSkillTree.tier3.length) * 10000) / 100
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
  }, [props.drivers, orderType])


  return(
    <>
      {
        selectedDriver !== defaultDriverState ?
          <CharacterPageDetails
            area="driver"
            id={selectedDriver.id}
            name={selectedDriver.name}
            availability={`Available from chapter: ${selectedDriver.chapterUnlocked}`}
            list={[
              {
                label: 'Arts: ',
                unlocked: selectedDriver.arts
                  .reduce((artTotal, art) => artTotal + art.levelUnlocked, 0),
                total: selectedDriver.arts.length * 6
              },
              {
                label: 'Skills: ',
                unlocked: selectedDriver.skillTree.tier1.filter((node) => node.Unlocked).length
                  + selectedDriver.skillTree.tier2.filter((node) => node.Unlocked).length
                  + selectedDriver.skillTree.tier3.filter((node) => node.Unlocked).length,
                total: selectedDriver.skillTree.tier1.length
                  + selectedDriver.skillTree.tier2.length
                  + selectedDriver.skillTree.tier3.length
              },
              {
                label: 'Hidden Skills: ',
                unlocked: selectedDriver.hiddenSkillTree.tier1
                  .filter((node) => node.Unlocked).length
                  + selectedDriver.hiddenSkillTree.tier2.filter((node) => node.Unlocked).length
                  + selectedDriver.hiddenSkillTree.tier3.filter((node) => node.Unlocked).length,
                total: selectedDriver.hiddenSkillTree.tier1.length
                  + selectedDriver.hiddenSkillTree.tier2.length
                  + selectedDriver.hiddenSkillTree.tier3.length
              },
            ]}
            onClose={setSelectedDriver.bind(this, defaultDriverState)}
          />
          : undefined
      }
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
