import { IDriverSkillNode } from 'interfaces';
import LockOverlay from 'components/UnavailableDataComponents/Overlays/LockOverlay';
import UnlockOverlay from 'components/UnavailableDataComponents/Overlays/UnlockOverlay';

interface IProps {
  node:IDriverSkillNode,
  tier:number,
  column:number,
  updateSkillNodes: (id:number, tier:number, unlock:boolean) => void,
  unlockedNodes?:number
}

const DriverSkillNode = (props:IProps) => {
  const unavailable = props.tier !== 1
    && (props.tier === 2 && (props.unlockedNodes !== undefined && props.unlockedNodes < 2)
    || props.tier === 3 && (props.unlockedNodes !== undefined && props.unlockedNodes < 5));
  return (
    <div className="col-sm-4 driver-skill-node-container" key={props.node.nodeId}>
      <div className='driver-skill-node'>
        {
          props.node.unlocked ?
            <LockOverlay
              id={props.node.nodeId}
              updateGameState={() => props.updateSkillNodes(props.column, props.tier, false)} />
            : <UnlockOverlay
              id={props.node.nodeId}
              updateGameState={() => props.updateSkillNodes(props.column, props.tier, true)} />
        }
        {unavailable ? <div className="unavailable"/> : null }
        <div className={`driver-skill-node-details ${props.node.unlocked ? 'unlocked' : ''}`}>
          <b>{props.node.name}</b>
          <br />
          {props.node.effect}
          <br />
          <b>SP: </b>{props.node.sp}
        </div>
      </div>
      {props.tier !== 3 ? <div className="driver-skill-node-separator" /> : null}
    </div>
  )
}

export default DriverSkillNode;