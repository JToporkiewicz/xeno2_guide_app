import { useState, useEffect, ReactChild, useContext } from 'react';
import client from '../../api-client';
import CharacterPanelContainer from '../CommonComponents/Containers/CharacterPanelsContainer';
import ClosedLinkedImagePanel from '../CommonComponents/ImagePanels/ClosedLinkedImagePanel';
import HeaderContainer from '../CommonComponents/Containers/HeaderContainer';
import UnavailableImagePanel from '../UnavailableDataComponents/Images/UnavailableImagePanel';
import { defaultStoryProgress, IDriver, IStoryProgress } from '../../interfaces';
import { LoaderContext } from '../App';

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
  const [orderType, setOrderType] = useState('default');
  const loaderContext = useContext(LoaderContext);

  const orderOptions: {[key:string]: keyof IShownDriver} = {
    default: 'id',
    alphabetically: 'Name',
    chapter: 'ChapterUnlocked'
  }
  
  const getOrderTypeColumn = (order: string): keyof IShownDriver => {
    return orderOptions[order] || orderOptions.default
  }

  useEffect(() => {
    loaderContext.setLoader(loaderContext.loaderState.concat('Fetch driver list'));
    fetchDrivers(setDrivers);
    fetchProgress(setProgress);
    loaderContext.setLoader(
      loaderContext.loaderState.filter((state) => state !== 'Fetch driver list')
    )
  }, [])

  useEffect(() => {
    if(drivers !== undefined && progress !== undefined){
      loaderContext.setLoader(loaderContext.loaderState.concat('Update driver list'));

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
        drivers
          .sort((driverA, driverB) => {
            const driverAValue = driverA[getOrderTypeColumn(orderType)]
            const driverBValue = driverB[getOrderTypeColumn(orderType)]
            if(driverAValue && driverBValue) {
              return driverAValue < driverBValue ? -1
                : driverAValue > driverBValue ? 1 : 0
            }
            return 0
          })
          .map((driver) =>
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

      loaderContext.setLoader(
        loaderContext.loaderState.filter((state) => state !== 'Update driver list')
      )
    }
  }, [drivers, progress, orderType])


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

export default DriversListPage;