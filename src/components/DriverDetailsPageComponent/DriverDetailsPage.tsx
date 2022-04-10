import {useState, useEffect, useContext} from 'react';
import client from '../../api-client';
import DriverBasicInfoComponent from './DriverBasicInfoComponent';
import HeaderContainer from '../CommonComponents/Containers/HeaderContainer';
import DriverArtsListComponent from './DriverArtsListComponent';
import { defaultDriver, IDriver } from '../../interfaces';
import { LoaderContext, ProgressContext } from '../App';
import Heart2HeartList from '../Heart2HeartsPage/Heart2HeartList';
import DriverSkillsComponent from './DriverSkillsComponent';

const fetchDriverDetails = async (
  setDetails:(driver:IDriver) => void,
  id:number
) => {
  try {
    const response = await client.resource('driver').get(id);
    setDetails(response);
  }
  catch(err) {
    console.log(`Error: ${err}`);
  }
};

interface IProps {
    match:any
}

const DriverDetailsPage = (props:IProps) => {
  let driverId = props.match.params.slug;
  const [driverDetails, setDriverDetails] = useState(defaultDriver);
  const progressState = useContext(ProgressContext).progressState;

  const {loaderState, setLoader} = useContext(LoaderContext);
  useEffect(() => {
    setLoader(loaderState.concat(['Fetching driver details']))
    fetchDriverDetails(setDriverDetails, driverId)
    setLoader(
      loaderState.filter((entry:string) => entry !== 'Fetching driver details')
    )
  }, [driverId])


  return (
    <>
      <HeaderContainer title={driverDetails.Name} />
      <DriverBasicInfoComponent driverDetails={driverDetails} />
      <DriverArtsListComponent driverId={driverId} />
      <DriverSkillsComponent treeId={driverDetails.DriverSkillTree} />
      {(!progressState.OnlyShowAvailable || progressState.NewGamePlus)
        && <DriverSkillsComponent treeId={driverDetails.HiddenSkillTree} hiddenTree={true} />}
      <Heart2HeartList
        characterName={driverDetails.Name}
        parentPage={'driver'}
      />
    </>
  )

}

export default DriverDetailsPage;