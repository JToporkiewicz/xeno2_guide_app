import PeekOverlay from '../Overlays/PeekOverlay';
import path from 'path';

interface IProps {
    updateState:(id:number) => void
    id:number
}

const SmallPeekPanel = (props:IProps) => {
  return (
    <div className="small-image-panel">
      <PeekOverlay
        updateGameState={props.updateState}
        id={props.id} />
      <img
        src={path.resolve('images/helper/Unknown.png')}
        alt={'Unknown'}
        className="small-image"/>
    </div>
  )
};

export default SmallPeekPanel;