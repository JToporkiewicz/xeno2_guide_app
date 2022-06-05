import { ReactChild, useEffect, useState } from 'react'
import { IStoryProgress } from '../../interfaces';
import { defaultBladeState } from '../../redux/interfaces/blades';
import { IBladeState, IUpdateShow } from '../../redux/interfaces/reduxState';
import { CharacterPageDetails } from '../CommonComponents/CharacterPageDetails';
import CharacterPanelContainer from '../CommonComponents/Containers/CharacterPanelsContainer';
import HeaderContainer from '../CommonComponents/Containers/HeaderContainer';
import { ClosedLinkedImagePanel } from '../CommonComponents/ImagePanels/ClosedLinkedImagePanel';
import UnavailableImagePanel from '../UnavailableDataComponents/Images/UnavailableImagePanel';

interface IDispatchProps {
  saveStoryProgress: (payload:IStoryProgress) => void;
  showLoader: (payload:string) => void;
  hideLoader: (payload:string) => void;
  updateShowBlade: (payload:IUpdateShow) => void;
}

interface IProps {
  blades: IBladeState[];
  storyProgress: IStoryProgress;
}

export const BladeListPageView = (props:IProps&IDispatchProps) => {
  const [bladeList, setBladeList] = useState([] as ReactChild[]);
  const [selectedBlade, setSelectedBlade] = useState(defaultBladeState as IBladeState)
  useEffect(() => {
    if(props.blades !== undefined) {
      props.showLoader('Update blade list');

      const updateShow = (blade:string) => {
        const bladeDetails = props.blades.find((b) => b.name === blade);
        if (bladeDetails) {
          props.updateShowBlade({id: bladeDetails.id, 'show': !bladeDetails.show})
        }
      }

      setBladeList(
        props.blades.filter((blade) => !blade.name.includes('Awakened'))
          .map((blade) =>
            props.storyProgress.OnlyShowAvailable &&
              (!blade.available && !blade.show) ?
              <div className="col-sm-3" key={blade.name}>
                <UnavailableImagePanel
                  name={blade.name}
                  panelType="blade"
                  id={blade.id}
                  toggleShow={updateShow.bind(this)}
                  updateState={() => {}}
                />
              </div>
              :
              <ClosedLinkedImagePanel
                panelType="blade"
                name={blade.name}
                id={blade.id}
                key={blade.name}
                unlocked={blade.unlocked}
                selectCharacter={setSelectedBlade.bind(this, blade)}
              />
          )
      )
      props.hideLoader('Update blade list');
    }
  }, [props.blades])

  return(
    <>
      {
        selectedBlade !== defaultBladeState ?
          <CharacterPageDetails
            area="blade"
            id={selectedBlade.id}
            name={selectedBlade.name}
            unlocked={`Unlocked: ${selectedBlade.unlocked ? 'Yes' : 'No'}`}
            availability={`Available: ${selectedBlade.available ? 'Yes' : 'No'}`}
            list={[]}
            onClose={setSelectedBlade.bind(this, defaultBladeState)}
          />
          : undefined
      }
      <HeaderContainer title="Blades" />
      <CharacterPanelContainer
        title="Blades"
      >
        {bladeList}
      </CharacterPanelContainer>
    </>
  )
}