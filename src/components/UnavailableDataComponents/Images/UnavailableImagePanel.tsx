import PeekOrUnlockOverlay from '../Overlays/PeekOrUnlockOverlay';

interface IProps {
    toggleShow:(name:string) => void,
    updateState:(id:number) => void
    name:string,
    id:number,
    panelType:string
}

const UnavailableImagePanel = (props:IProps) => {
  return (
    <div className="image-panel">
      <PeekOrUnlockOverlay
        toggleShow={props.toggleShow}
        updateState={props.updateState}
        name={props.name}
        id={props.id} />
      <img
        src={'/images/helper/Unknown.png'}
        alt={'Unknown'}
        className={props.panelType === 'weaponType' ? 'weapon-class-image' : 'character-image'}/>
      <div className="image-name">Spoiler</div>
    </div>
  )
};

export default UnavailableImagePanel;