import PeekOrUnlockOverlay from '../Overlays/PeekOrUnlockOverlay';

interface IProps {
    toggleShow:(name:string) => void,
    updateState:(id:number) => void
    name:string,
    id:number
}

const SmallUnavailableImagePanel = (props:IProps) => {
  return (
    <div className="small-image-panel">
      <PeekOrUnlockOverlay
        toggleShow={props.toggleShow}
        updateState={props.updateState}
        name={props.name}
        id={props.id} />
      <img
        src={'/images/helper/Unknown.png'}
        alt={'Unknown'}
        className="small-image"/>
    </div>
  )
};

export default SmallUnavailableImagePanel;