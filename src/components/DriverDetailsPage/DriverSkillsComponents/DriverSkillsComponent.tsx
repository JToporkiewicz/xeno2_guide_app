import { useEffect, useRef, useState } from 'react';
import { IDriverSkillNode, IDriverSkillTree } from 'interfaces';
import { IDriverSkillNodeUpdate } from 'reduxState/interfaces/drivers';
import { BranchDetails } from 'components/CommonComponents/BranchDetails';
import { TreeBranch } from 'components/CommonComponents/TreeBranch';
import CollapsibleComponent from 'components/CommonComponents/Containers/CollapsibleComponent'
import DriverSkillTreeTierStatus from './TreeComponents/DriverSkillTreeTierStatus';
import { IUpdateUnlocked } from 'reduxState/interfaces/reduxState';

interface IDispatchProps {
  setDriverSkillNode: (payload:IDriverSkillNodeUpdate) => void;
  saveDriverSkillNode: (payload:IUpdateUnlocked) => void;
}

interface IOwnProps {
  tree: IDriverSkillTree;
  hiddenTree?:boolean;
  driverUnlocked:boolean;
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
        node.unlocked).length - 1 : props.tree.tier1.filter((node:IDriverSkillNode) =>
        node.unlocked).length;
      const newUnlockedTier2 = tier < 3 ? props.tree.tier2.filter((node:IDriverSkillNode) =>
        node.unlocked).length - 1 : props.tree.tier2.filter((node:IDriverSkillNode) =>
        node.unlocked).length;
      switch(tier) {
      // @ts-ignore
      case 1:
        if (props.tree.tier1[column].unlocked) {
          nodes = nodes.concat([{node: props.tree.tier1[column], tier: 1}])
        }
      // @ts-ignore
      case 2:
        if (props.tree.tier2[column].unlocked) {
          nodes = nodes.concat([{node: props.tree.tier2[column], tier: 2}])
        }
      // @ts-ignore
      case 3:
        if (props.tree.tier3[column].unlocked) {
          nodes = nodes.concat([{node: props.tree.tier3[column], tier: 3}])
        }
      default:
        break;
      }

      const unlockedNodesIds = nodes.map((nodeDetails) => nodeDetails.node.nodeId);

      if(newUnlockedTier1 < 2) {
        nodes = nodes
          .concat(props.tree.tier2
            .filter((oldNodes) => !unlockedNodesIds.includes(oldNodes.nodeId) && oldNodes.unlocked)
            .map((node) => ({
              node,
              tier: 2
            })))
          .concat(props.tree.tier3
            .filter((oldNodes) => !unlockedNodesIds.includes(oldNodes.nodeId) && oldNodes.unlocked)
            .map((node) => ({
              node,
              tier: 3
            })))
      } else if(newUnlockedTier1 + newUnlockedTier2 < 5) {
        nodes = nodes.concat(props.tree.tier3
          .filter((oldNodes) => !unlockedNodesIds.includes(oldNodes.nodeId) && oldNodes.unlocked)
          .map((node) => ({
            node,
            tier: 3
          })))
      }
    }
    const nodesIds = nodes.map((nodeDetails) => nodeDetails.node.nodeId);
    props.setDriverSkillNode({
      treeId: props.tree.treeId,
      nodes: nodes.map((nodeDetails) => ({
        ...nodeDetails.node,
        unlocked: unlock
      }))})
    toUpdate.current = toUpdate.current.filter((node) => !nodesIds.includes(node.nodeId))
      .concat(nodes.map((nodeDetails) => ({...nodeDetails.node, unlocked: unlock})))
  }

  useEffect(() => {
    if(props.tree.treeId !== 0){
      let unlocked1 = props.tree.tier1.filter((node:IDriverSkillNode) =>
        node.unlocked).length;
      let unlocked2 = props.tree.tier2.filter((node:IDriverSkillNode) =>
        node.unlocked).length;
      setUnlockedLevel1(unlocked1);
      setUnlockedLevel2(unlocked2);
    }
  }, [props.tree])

  useEffect(() => {
    return () => {
      if (toUpdate.current.length > 0) {
        props.saveDriverSkillNode({
          unlocked: toUpdate.current.filter((node) => node.unlocked && node.nodeId)
            .map((node) => node.nodeId)
            .sort((nodeA, nodeB) => nodeA < nodeB ? -1 : 1),
          locked: toUpdate.current.filter((node) => !node.unlocked && node.nodeId)
            .map((node) => node.nodeId)
            .sort((nodeA, nodeB) => nodeA < nodeB ? -1 : 1),
        })
      }
    } 
  }, [])

  const getTreeTierNodes = () => [
    {
      nodeId:-1,
      name:'Tier 1',
      effect:'',
      sp:0,
      unlocked:true,
      Tier: 1
    },
    {
      nodeId:-1,
      name:'Tier 2',
      effect:'',
      sp:0,
      unlocked:unlockedTier1 >= 2,
      Tier: 2
    },
    {
      nodeId:-1,
      name:'Tier 3',
      effect:'',
      sp:0,
      unlocked:unlockedTier1 + unlockedTier2 >= 5,
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
                    unlocked: node.unlocked
                  }))}
                  branchName={b[0].name === 'Tier 1' ? 'Tree tier' : ''}
                  availableTier={props.driverUnlocked ? unlockedTreeTier : 0}
                  setSelectedBranch={setSelectedBranch.bind(this, index - 1)}
                  selectedBranch={selectedBranch === index - 1}
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
              driverUnlocked={props.driverUnlocked}
              unlockedTier1={unlockedTier1}
              unlockedTier2={unlockedTier2}
            />
            {selectedBranch > -1 ?
              <BranchDetails
                availableTier={
                  props.driverUnlocked ?
                    unlockedTier1 + unlockedTier2 >= 5 ? 3 : unlockedTier1 >= 2 ? 2 : 1
                    : 0}
                nodes={[
                  {
                    nodeId: props.tree.tier1[selectedBranch].nodeId,
                    unlocked: props.tree.tier1[selectedBranch].unlocked,
                    tier: 1,
                    Body:
                      <>
                        <b>{props.tree.tier1[selectedBranch].name}</b>
                        <br />
                        {props.tree.tier1[selectedBranch].effect}
                        <br />
                        <b>sp: </b>{props.tree.tier1[selectedBranch].sp}
                      </>
                  },
                  {
                    nodeId: props.tree.tier2[selectedBranch].nodeId,
                    unlocked: props.tree.tier2[selectedBranch].unlocked,
                    tier: 2,
                    Body:
                      <>
                        <b>{props.tree.tier2[selectedBranch].name}</b>
                        <br />
                        {props.tree.tier2[selectedBranch].effect}
                        <br />
                        <b>sp: </b>{props.tree.tier2[selectedBranch].sp}
                      </>
                  },
                  {
                    nodeId: props.tree.tier3[selectedBranch].nodeId,
                    unlocked: props.tree.tier3[selectedBranch].unlocked,
                    tier: 3,
                    Body:
                      <>
                        <b>{props.tree.tier3[selectedBranch].name}</b>
                        <br />
                        {props.tree.tier3[selectedBranch].effect}
                        <br />
                        <b>sp: </b>{props.tree.tier3[selectedBranch].sp}
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
