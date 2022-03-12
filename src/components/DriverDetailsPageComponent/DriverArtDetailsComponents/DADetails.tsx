import DADetailsHeader from './DADetailsHeader';
import DALevels from './DALevels';
import DADescription from './DADescription';
import InnerCollapsibleComponent from '../../CommonComponents/Containers/InnerCollapsibleComponent';
import { IDriverArts } from '../../../interfaces';

interface IProps {
  weapon:string,
  clearArt:() => void,
  weaponArts:IDriverArts[],
  updateArtLevel:(artId:number, level:number) => void
}

const DADetails = (props:IProps) => {

  return(
    <div className="art-details-panel">
      <DADetailsHeader weapon={props.weapon} clearArt={props.clearArt} />
      <hr/>
      {
        Object.values(props.weaponArts).map((art, key) => 
          <InnerCollapsibleComponent header={art.Name} key={key}>
            <>
              <DALevels {...art} updateArtLevel={props.updateArtLevel} />
              <DADescription {...art} />
            </>
          </InnerCollapsibleComponent>
        )
      }
    </div>
  )
};

export default DADetails;