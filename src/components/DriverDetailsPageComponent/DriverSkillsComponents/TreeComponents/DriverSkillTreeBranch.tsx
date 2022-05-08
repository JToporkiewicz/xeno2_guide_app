import { IDriverSkillNode } from '../../../../interfaces';
import DriverSkillNode from './DriverSkillNode';

interface IProps {
  key:number;
  column:number;
  node1:IDriverSkillNode,
  node2:IDriverSkillNode,
  node3:IDriverSkillNode,
  unlockedTier1: number,
  unlockedTier2: number,
  updateSkillNodes: (key:number, tier:number, unlock:boolean) => void
}

const DriverSkillTreeBranch = (props:IProps) => {
  return (
    <div className="driver-skill-branch">
      <DriverSkillNode
        node={props.node1}
        column={props.column}
        tier={1}
        updateSkillNodes={props.updateSkillNodes}
      />
      <DriverSkillNode
        node={props.node2}
        column={props.column}
        tier={2}
        updateSkillNodes={props.updateSkillNodes}
        unlockedNodes={props.unlockedTier1}/>
      <DriverSkillNode
        node={props.node3}
        column={props.column}
        tier={3}
        updateSkillNodes={props.updateSkillNodes}
        unlockedNodes={props.unlockedTier1 + props.unlockedTier2}/>
    </div>
  )
}

export default DriverSkillTreeBranch;