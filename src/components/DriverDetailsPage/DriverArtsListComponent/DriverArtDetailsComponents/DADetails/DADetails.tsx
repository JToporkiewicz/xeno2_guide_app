import { DADetailsHeader } from '../DADetailsHeader';
import { DALevels } from '../DALevels';
import DADescription from '../DADescription';
import InnerCollapsibleComponent
  from 'components/CommonComponents/Containers/InnerCollapsibleComponent';
import { IDriverArts } from 'interfaces';
import { IBladeAvailability } from 'reduxState/interfaces/availabilityState';
import { useEffect, useState } from 'react';

interface IOwnProps {
  weapon:string,
  clearArt:() => void,
  weaponArts:IDriverArts[],
  updateArtLevel:(artId:number, level:number) => void
}

interface IProps {
  blades: IBladeAvailability[];
  driverUnlocked: boolean;
}

export const DADetailsView = (props:IProps & IOwnProps) => {
  const [remainingSP, setRemainingSP] = useState(0);

  useEffect(() => {
    const artSP = props.weaponArts.reduce((total: number, art: IDriverArts) => {
      if(art.nodes[0] !== undefined){
        let SP = 0;
        let remainingSP = 0;
        for(let i = 0; i < art.nodes.length; i++){
          SP = SP + art.nodes[i].sp
          if(i >= art.levelUnlocked){
            remainingSP = remainingSP + art.nodes[i].sp
          }
        }
        return total + remainingSP;
      }
      return total;
    }, 0)

    setRemainingSP(artSP)
  }, [props.weaponArts])

  return(
    <div className="art-details-panel">
      <DADetailsHeader
        weapon={props.weapon}
        remainingTotal={remainingSP}
        clearArt={props.clearArt}
        blades={props.blades.filter((blade) => blade.weapon === props.weapon && blade.id !== 53)}
      />
      <hr/>
      {
        Object.values(props.weaponArts).map((art, key) => 
          <InnerCollapsibleComponent header={`${art.name}: ${art.levelUnlocked} / 6`} key={key}>
            <>
              <DALevels
                art={art}
                updateArtLevel={props.updateArtLevel}
                driverUnlocked={props.driverUnlocked}
              />
              <DADescription {...art} />
            </>
          </InnerCollapsibleComponent>
        )
      }
    </div>
  )
};
