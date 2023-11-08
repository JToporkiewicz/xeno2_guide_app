import { DADetailsHeader } from '../DADetailsHeader';
import { DALevels } from '../DALevels';
import DADescription from '../DADescription';
import InnerCollapsibleComponent
  from 'components/CommonComponents/Containers/InnerCollapsibleComponent';
import { IDriverArts } from 'interfaces';
import { IBladeState } from 'reduxState/interfaces/reduxState';

interface IOwnProps {
  weapon:string,
  clearArt:() => void,
  weaponArts:IDriverArts[],
  updateArtLevel:(artId:number, level:number) => void
}

interface IProps {
  blades: IBladeState[]
}

export const DADetailsView = (props:IProps & IOwnProps) => {

  return(
    <div className="art-details-panel">
      <DADetailsHeader
        weapon={props.weapon}
        clearArt={props.clearArt}
        blades={props.blades.filter((blade) => blade.weapon === props.weapon && blade.id !== 53)}
      />
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
