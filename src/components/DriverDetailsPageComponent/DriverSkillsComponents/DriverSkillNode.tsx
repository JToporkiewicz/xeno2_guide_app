import { IDriverSkillNode } from '../../../interfaces';
import LockOverlay from '../../UnavailableDataComponents/Overlays/LockOverlay';
import UnlockOverlay from '../../UnavailableDataComponents/Overlays/UnlockOverlay';

interface IProps {
  node:IDriverSkillNode,
  tier:number,
  updateSkillNodes: (id:number, tier:number, unlock:boolean) => void,
  unlockedNodes?:number
}

const DriverSkillNode = (props:IProps) => {
  const unavailable = props.tier !== 1
    && (props.tier === 2 && (props.unlockedNodes !== undefined && props.unlockedNodes < 2)
    || props.tier === 3 && (props.unlockedNodes !== undefined && props.unlockedNodes < 5));
  return (
    <div className="col-sm-4 driver-skill-node-container" key={props.node.id}>
      <div className='driver-skill-node'>
        {
          props.node.Unlocked ?
            <LockOverlay
              id={props.node.id}
              updateGameState={() => props.updateSkillNodes(props.node.id, props.tier, false)} />
            : <UnlockOverlay
              id={props.node.id}
              updateGameState={() => props.updateSkillNodes(props.node.id, props.tier, true)} />
        }
        {unavailable ? <div className="unavailable"/> : null }
        <div className={`driver-skill-node-details ${props.node.Unlocked ? 'unlocked' : ''}`}>
          <b>{props.node.Name}</b>
          <br />
          {props.node.Effect}
          <br />
          <b>SP: </b>{props.node.SP}
        </div>
      </div>
      {props.tier !== 3 ? <div className="driver-skill-node-separator" /> : null}
    </div>
  )
}

export default DriverSkillNode;