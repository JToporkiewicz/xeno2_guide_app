import { useEffect, useRef, useState } from 'react';
import { IDriverSkillNode } from '../../../interfaces';
import {
  IDriverSkillNodeUpdate
} from '../../../redux/interfaces/drivers';
import { ISkillTreeState } from '../../../redux/interfaces/reduxState';
import { BranchDetails } from '../../CommonComponents/BranchDetails';
import { TreeBranch } from '../../CommonComponents/TreeBranch';
import CollapsibleComponent from '../../CommonComponents/Containers/CollapsibleComponent'
import DriverSkillTreeTierStatus from './TreeComponents/DriverSkillTreeTierStatus';

interface IDispatchProps {
  setDriverSkillNode: (payload:IDriverSkillNode[]) => void;
  saveDriverSkillNode: (payload:IDriverSkillNodeUpdate) => void;
}

interface IOwnProps {
  tree: ISkillTreeState;
  hiddenTree?:boolean;
}

export const DriverSkillsComponentView = (props:IOwnProps & IDispatchProps) => {
  const [unlockedTier1, setUnlockedLevel1] = useState(-1);
  const [unlockedTier2, setUnlockedLevel2] = useState(-1);
  const [selectedBranch, setSelectedBranch] = useState(-2);

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
    props.setDriverSkillNode(nodes.map((nodeDetails) => ({
      ...nodeDetails.node,
      Unlocked: unlock
    })))
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
    }
  }, [props.tree])

  useEffect(() => {
    return () => {
      toUpdate.current.forEach((node:IDriverSkillNode) => 
        props.saveDriverSkillNode({nodeId: node.id, node})
      )
    } 
  }, [])

  const getTreeTierNodes = () => [
    {
      id:-1,
      Name:'Tier 1',
      Effect:'',
      SP:0,
      Unlocked:true,
      Tier: 1
    },
    {
      id:-1,
      Name:'Tier 2',
      Effect:'',
      SP:0,
      Unlocked:unlockedTier1 >= 2,
      Tier: 2
    },
    {
      id:-1,
      Name:'Tier 3',
      Effect:'',
      SP:0,
      Unlocked:unlockedTier1 + unlockedTier2 >= 5,
      Tier: 3
    },
  ]

  return (
    <CollapsibleComponent header={props.hiddenTree ?
      'Driver Hidden Affinity Tree'
      : 'Driver Affinity Tree'}>
      {unlockedTier1 !== -1 && unlockedTier2 !== -1 ? 
        <>
          <div className="tree-wrapper">
            <div className="tree-area">
              {[getTreeTierNodes()].concat(props.tree.tier1.map((tier, index) => [
                {...tier, Tier: 1},
                {...props.tree.tier2[index], Tier:2},
                {...props.tree.tier3[index], Tier:3}
              ])).map((b, index) => {
                const unlockedTreeTier =
                unlockedTier1 + unlockedTier2 >= 5 ? 3 : unlockedTier1 >= 2 ? 2 : 1;
                return <TreeBranch
                  key={(props.hiddenTree ? 'hidden' : 'tree - branch ') + index}
                  index={index}
                  treeBranchesCount={props.tree.tier1.length + 1}
                  nodesPerBranch={3}
                  nodes={b.map((node) => ({
                    tier: node.Tier,
                    unlocked: node.Unlocked
                  }))}
                  branchName={b[0].Name === 'Tier 1' ? 'Tree tier' : ''}
                  availableTier={unlockedTreeTier}
                  setSelectedBranch={setSelectedBranch.bind(this, index - 1)}
                />
              })}
            </div>
          </div>
        </>
        : <div>Not found</div>
      }
      {
        selectedBranch !== -2 ?
          <>
            <hr />
            <DriverSkillTreeTierStatus
              unlockedTier1={unlockedTier1}
              unlockedTier2={unlockedTier2}
            />
            {selectedBranch > -1 ?
              <BranchDetails
                availableTier={unlockedTier1 + unlockedTier2 >= 5 ? 3 : unlockedTier1 >= 2 ? 2 : 1}
                nodes={[
                  {
                    id: props.tree.tier1[selectedBranch].id,
                    Unlocked: props.tree.tier1[selectedBranch].Unlocked,
                    Tier: 1,
                    Body:
                      <>
                        <b>{props.tree.tier1[selectedBranch].Name}</b>
                        <br />
                        {props.tree.tier1[selectedBranch].Effect}
                        <br />
                        <b>SP: </b>{props.tree.tier1[selectedBranch].SP}
                      </>
                  },
                  {
                    id: props.tree.tier2[selectedBranch].id,
                    Unlocked: props.tree.tier2[selectedBranch].Unlocked,
                    Tier: 2,
                    Body:
                      <>
                        <b>{props.tree.tier2[selectedBranch].Name}</b>
                        <br />
                        {props.tree.tier2[selectedBranch].Effect}
                        <br />
                        <b>SP: </b>{props.tree.tier2[selectedBranch].SP}
                      </>
                  },
                  {
                    id: props.tree.tier3[selectedBranch].id,
                    Unlocked: props.tree.tier3[selectedBranch].Unlocked,
                    Tier: 3,
                    Body:
                      <>
                        <b>{props.tree.tier3[selectedBranch].Name}</b>
                        <br />
                        {props.tree.tier3[selectedBranch].Effect}
                        <br />
                        <b>SP: </b>{props.tree.tier3[selectedBranch].SP}
                      </>
                  }
                ]}
                updateNode={updateSkillNodes.bind(this, selectedBranch)}
              />
              : <div />
            }
          </>
          : <div />
      }
    </CollapsibleComponent>
  )
};
