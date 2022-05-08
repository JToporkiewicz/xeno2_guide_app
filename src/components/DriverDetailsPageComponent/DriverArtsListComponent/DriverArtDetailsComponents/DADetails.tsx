import { DADetailsHeader } from './DADetailsHeader';
import { DALevels } from './DALevels';
import DADescription from './DADescription';
import InnerCollapsibleComponent
  from '../../../CommonComponents/Containers/InnerCollapsibleComponent';
import { IDriverArtsState } from '../../../../redux/interfaces/reduxState';

interface IProps {
  weapon:string,
  clearArt:() => void,
  weaponArts:IDriverArtsState[],
  updateArtLevel:(artId:number, level:number) => void
}

const DADetails = (props:IProps) => {

  return(
    <div className="art-details-panel">
      <DADetailsHeader weapon={props.weapon} clearArt={props.clearArt} />
      <hr/>
      {
        Object.values(props.weaponArts).map((art, key) => 
          <InnerCollapsibleComponent header={art.name} key={key}>
            <>
              <DALevels art={art} updateArtLevel={props.updateArtLevel} />
              <DADescription {...art} />
            </>
          </InnerCollapsibleComponent>
        )
      }
    </div>
  )
};

export default DADetails;