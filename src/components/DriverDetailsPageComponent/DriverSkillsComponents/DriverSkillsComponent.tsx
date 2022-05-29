import { ReactChild, useEffect, useRef, useState } from 'react';
import { IDriverSkillNode } from '../../../interfaces';
import {
  IDriverSkillNodeUpdate
} from '../../../redux/interfaces/drivers';
import { ISkillTreeState } from '../../../redux/interfaces/reduxState';
import CollapsibleComponent from '../../CommonComponents/Containers/CollapsibleComponent'
import DriverSkillTreeBranch from './TreeComponents/DriverSkillTreeBranch';
import DriverSkillTreeTierStatus from './TreeComponents/DriverSkillTreeTierStatus';

interface IDispatchProps {
  setDriverSkillNode: (payload:IDriverSkillNode) => void;
  saveDriverSkillNode: (payload:IDriverSkillNodeUpdate) => void;
}

interface IOwnProps {
  tree: ISkillTreeState;
  hiddenTree?:boolean;
}

export const DriverSkillsComponentView = (props:IOwnProps & IDispatchProps) => {
  const [unlockedTier1, setUnlockedLevel1] = useState(-1);
  const [unlockedTier2, setUnlockedLevel2] = useState(-1);
  const [driverSkills, setDriverSkills] = useState([] as ReactChild[])

  const toUpdate = useRef([] as IDriverSkillNode[]);

  const updateSkillNodes = (column:number, tier:number, unlock: boolean) => {
    let nodes: {node: IDriverSkillNode, tier: number}[] = [];
    if(unlock){
      nodes = nodes.concat([{node: props.tree.tier1[column], tier: 1}])
      if(tier > 1) {
        nodes = nodes.concat([{node: props.tree.tier2[column], tier: 2}])
      }
      if(tier > 2) {
        nodes = nodes.concat([{node: props.tree.tier3[column], tier: 3}])
      }
    } else {
      const newUnlockedTier1 = tier === 1 ? props.tree.tier1.filter((node:IDriverSkillNode) =>
        node.Unlocked).length - 1 : props.tree.tier1.filter((node:IDriverSkillNode) =>
        node.Unlocked).length;
      const newUnlockedTier2 = tier < 3 ? props.tree.tier2.filter((node:IDriverSkillNode) =>
        node.Unlocked).length - 1 : props.tree.tier2.filter((node:IDriverSkillNode) =>
        node.Unlocked).length;
      switch(tier) {
      // @ts-ignore
      case 1:
        nodes = nodes.concat([{node: props.tree.tier1[column], tier: 1}])
      // @ts-ignore
      case 2:
        nodes = nodes.concat([{node: props.tree.tier2[column], tier: 2}])
      // @ts-ignore
      case 3:
        nodes = nodes.concat([{node: props.tree.tier3[column], tier: 3}])
      default:
        break;
      }

      if(newUnlockedTier1 < 2) {
        nodes = nodes
          .concat(props.tree.tier2.map((node) => ({
            node,
            tier: 2
          })))
          .concat(props.tree.tier3.map((node) => ({
            node,
            tier: 3
          })))
      } else if(newUnlockedTier1 + newUnlockedTier2 < 5) {
        nodes = nodes.concat(props.tree.tier3.map((node) => ({
          node,
          tier: 3
        })))
      }
    }
    const nodesIds = nodes.map((nodeDetails) => nodeDetails.node.id);
    nodes.forEach((nodeDetails) => props.setDriverSkillNode({
      ...nodeDetails.node,
      Unlocked: unlock
    }))
    toUpdate.current = toUpdate.current.filter((node) => !nodesIds.includes(node.id))
      .concat(nodes.map((nodeDetails) => nodeDetails.node))
  }

  useEffect(() => {
    if(props.tree.treeId !== 0){
      toUpdate.current = props.tree.tier1.concat(props.tree.tier2).concat(props.tree.tier3);
      let unlocked1 = props.tree.tier1.filter((node:IDriverSkillNode) =>
        node.Unlocked).length;
      let unlocked2 = props.tree.tier2.filter((node:IDriverSkillNode) =>
        node.Unlocked).length;
      setUnlockedLevel1(unlocked1);
      setUnlockedLevel2(unlocked2);
      setDriverSkills(props.tree.tier1.map((_, i) => 
        <DriverSkillTreeBranch
          key={i}
          column={i}
          node1={props.tree.tier1[i]}
          node2={props.tree.tier2[i]}
          node3={props.tree.tier3[i]}
          unlockedTier1={unlocked1}
          unlockedTier2={unlocked2}
          updateSkillNodes={updateSkillNodes}
        />
      )
      )
    }
  }, [props.tree])

  useEffect(() => {
    return () => {
      toUpdate.current.forEach((node:IDriverSkillNode) => 
        props.saveDriverSkillNode({nodeId: node.id, node})
      )
    } 
  }, [])

  return (
    <CollapsibleComponent header={props.hiddenTree ?
      'Driver Hidden Affinity Tree'
      : 'Driver Affinity Tree'}>
      {unlockedTier1 !== -1 && unlockedTier2 !== -1 ? 
        <>
          <DriverSkillTreeTierStatus unlockedTier1={unlockedTier1} unlockedTier2={unlockedTier2} />
          {driverSkills.map((branch, index) => 
            <div key={index}>{branch}</div>)}
        </>
        : <div>Not found</div>
      }

    </CollapsibleComponent>
  )
};
