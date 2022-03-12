import { useState, useEffect, ReactChild } from 'react';
import client from '../../api-client';
import CharacterPanelContainer from '../CommonComponents/Containers/CharacterPanelsContainer';
import ClosedLinkedImagePanel from '../CommonComponents/ImagePanels/ClosedLinkedImagePanel';
import HeaderContainer from '../CommonComponents/Containers/HeaderContainer';
import UnavailableImagePanel from '../UnavailableDataComponents/Images/UnavailableImagePanel';
import { defaultStoryProgress, IDriver, IStoryProgress } from '../../interfaces';

interface IShownDriver extends IDriver {
    Show?:boolean
}

const fetchDrivers = async (setDrivers:(drivers:IShownDriver[]) => void) => {
  try {
    const response = await client.resource('driver').find();
    setDrivers(response.map((r:IShownDriver) => ({...r, Show: false})));
  }
  catch(err) {
    console.log(`Error: ${err}`);
  }
};

const fetchProgress = async (setSettings:(story:IStoryProgress) => void) => {
  try {
    const response = await client.resource('storyProgress').get(1);
    setSettings(response);
  }
  catch(err) {
    console.log(`Error: ${err}`);
  }
}

const DriversListPage = () => {

  const [drivers, setDrivers] = useState([] as IShownDriver[])
  const [progress, setProgress] = useState(defaultStoryProgress)
  const [driversList, setDriverList] = useState([] as ReactChild[]);

  useEffect(() => {
    fetchDrivers(setDrivers);
    fetchProgress(setProgress);
  }, [])

  useEffect(() => {
    if(drivers !== undefined && progress !== undefined){

      const updateShow = (driver:string) => {
        setDrivers(drivers.map((d) => d.Name === driver ? {...d, 'Show': !d.Show} : d))
      }

      const updateGameState = (entryId:number) => {
        const driver = drivers.find(d => d.id === entryId);
        if(driver) {
          setProgress({...progress,
            Chapter: driver.ChapterUnlocked})
          client.resource('storyProgress').update(1, {Chapter: driver.ChapterUnlocked})
        }
      }

      setDriverList(    
        drivers.map((driver) =>
          progress.OnlyShowAvailable ?
            driver.ChapterUnlocked <= progress.Chapter || driver.Show ? 
              <ClosedLinkedImagePanel
                panelType="driver"
                name={driver.Name}
                id={driver.id}
                key={driver.Name}
              /> :
              <div className="col-sm-3">
                <UnavailableImagePanel
                  name={driver.Name}
                  panelType="driver"
                  id={driver.id}
                  toggleShow={updateShow.bind(this)}
                  updateState={updateGameState.bind(this)}
                  key={driver.Name}
                />
              </div>
            : 
            <ClosedLinkedImagePanel
              panelType="driver"
              name={driver.Name}
              id={driver.id}
              key={driver.Name}
            />
        )
      )
    }
  }, [drivers, progress])


  return(
    <>
      <HeaderContainer title="Drivers"/>
      <CharacterPanelContainer title="Drivers">
        {driversList}
      </CharacterPanelContainer>
    </>
  )
}

export default DriversListPage;