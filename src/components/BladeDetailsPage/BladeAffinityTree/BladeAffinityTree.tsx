import { useEffect, useRef, useState } from 'react';
import { isEqual } from 'lodash';
import { IAffinityChartNode } from 'interfaces/AffinityChart';
import {
  IAffinityChartBranchState,
  IAffinityChartNodeState,
  IUpdateUnlocked
} from 'reduxState/interfaces/reduxState'
import CollapsibleComponent from 'components/CommonComponents/Containers/CollapsibleComponent'
import { BranchDetails } from 'components/CommonComponents/BranchDetails';
import { TreeBranch } from 'components/CommonComponents/TreeBranch';
import { RequirementList } from 'components/CommonComponents/RequirementList';
import { IUpdateACNReqProgress } from 'reduxState/interfaces/blades';

interface IOwnProps {
  affinityChart: IAffinityChartBranchState[],
  bladeId: number
}

interface IDispatchProps {
  setBladeSkillNode: (node: IAffinityChartNode[]) => void;
  saveBladeSkillNode: (node: IUpdateUnlocked) => void;
  fetchFieldSkills: () => void;
  updateACNReqStatus: (progress: IUpdateACNReqProgress) => void;
}

export const BladeAffinityTreeView = (props: IOwnProps & IDispatchProps) => {
  const [selectedBranch, setSelectedBranch] = useState(-1);
  const [selectedNode, setSelectedNode] = useState(-1);
  const currentTree = useRef(props.affinityChart);

  const unlockNode = (branch: number, tier: number, unlocked: boolean) => {
    let updatingNodes = [] as IAffinityChartNodeState[];
    const foundNode = props.affinityChart[branch].nodes.find((n) => n.tier === tier);
    if (unlocked) {
      updatingNodes = updatingNodes.concat(foundNode ? {
        ...foundNode,
        unlocked: true,
        preReqs: foundNode.preReqs?.map((pre) => ({
          ...pre,
          completed: pre.completed !== undefined ? true : undefined,
          progress: pre.progress !== undefined ? pre.requirementCount : undefined 
        }))
      } : []);
    } else {
      updatingNodes = updatingNodes.concat(foundNode ? [{...foundNode, unlocked: false}].concat(
        props.affinityChart[branch].nodes.filter((n) => n.tier > foundNode.tier && n.unlocked)
          .map((n) => ({ ...n, unlocked: false }))
      ) : []);
      if (branch === 0) {
        updatingNodes = updatingNodes.concat(...props.affinityChart
          .map((b) => [...b.nodes.filter((n) => n.tier >= tier
            && n.unlocked
            && n.nodeId !== foundNode?.nodeId)]
            .map((n) => ({...n, unlocked: false}))))
      }
    }
    props.setBladeSkillNode(updatingNodes)
  }

  const getBranchDetails = () => {
    const selectedDetails = props.affinityChart[selectedBranch];
    const unlockedAffinity =
      props.affinityChart[0]?.nodes.find((n) => !n.unlocked)?.tier || 6;
    const unlockedBranchTier =
      selectedDetails?.nodes.find((n) => !n.unlocked)?.tier || 6;
    return <>
      <hr />
      <h2>{props.affinityChart[selectedBranch]?.branchName || ''}</h2>
      <BranchDetails
        availableTier={selectedDetails?.branchName === 'Affinity' ?
          unlockedAffinity
          : unlockedAffinity > unlockedBranchTier ?
            unlockedBranchTier : unlockedAffinity - 1}
        nodes={selectedDetails?.nodes.map((n) => ({
          nodeId: n.nodeId,
          unlocked: n.unlocked,
          available: n.available,
          tier: n.tier,
          Body: <div
            key={'nodeDetails ' + n.nodeId}
          >
            <b>Level:</b> {n.skillLevel} | <b>Tier:</b> {n.tier}
            <br/>
            <b>Effect:</b>
            <br/>
            {n.effect && n.effect.map((e:any, index:number) =>
              <div key={'effect ' + n.nodeId + '->' + index}>{e}<br/></div>)
            }
          </div>
        }))}
        updateNode={unlockNode.bind(this, selectedBranch)}
        firstaAlwaysUnlocked={selectedDetails?.nodes[0].preReqs === undefined}
        onMouseEnter={setSelectedNode}
      />
    </>
  }

  useEffect(() => {
    if (props.affinityChart[0] !== undefined) {
      setSelectedBranch(-1);
    }
  }, [props.affinityChart.length])

  useEffect(() => {
    currentTree.current = props.affinityChart
  }, [props.affinityChart])

  useEffect(() => {
    return () => {
      if (!isEqual(props.affinityChart, currentTree.current)) {
        const flattenedTree = props.affinityChart.reduce((list, t) =>
          list.concat(t.nodes), [] as IAffinityChartNodeState[])
        const update = currentTree.current
          .reduce((list, t) => list.concat(t.nodes), [] as IAffinityChartNodeState[])
          .filter((node) => !flattenedTree.some((newN) => isEqual(newN, node)))
        if (update.length) {
          props.saveBladeSkillNode({
            unlocked: update
              .filter((node) => node.unlocked)
              .map((node) => node.nodeId),
            locked: update
              .filter((node) => !node.unlocked)
              .map((node) => node.nodeId),
            partial: update
              .filter((node) => !node.unlocked && node.preReqs !== undefined)
              .reduce((list, node) => {
                const reqs = (node.preReqs || [])?.filter((pre) => pre.progress !== undefined)
                  .map((pre) => ({
                    id: pre.id,
                    progress: pre.progress
                  }));

                return list.concat(reqs)
              }, [] as {id: number | undefined, progress: number | undefined }[])
          })
          setTimeout(props.fetchFieldSkills, 1000)

        }
      }
    }
  }, [])

  return (
    <CollapsibleComponent
      header={'Affinity Chart'}
    >
      <div className="tree-wrapper">
        <div className="tree-area">
          {props.affinityChart.map((b, index) => {
            const unlockedAffinity =
              props.affinityChart[0].nodes.find((n) => !n.unlocked)?.tier || 6;
            const unlockedBranchTier =
              b.nodes.find((n) => !n.unlocked || !n.available)?.tier || 6;
            return <TreeBranch
              key={'branch ' + index}
              index={index}
              treeBranchesCount={props.affinityChart.length}
              nodesPerBranch={5}
              branchName={b.branchName}
              nodes={b.nodes.map((node) => ({
                tier: node.tier,
                unlocked: node.unlocked,
                available: node.available
              }))}
              availableTier={index === 0 ?
                unlockedAffinity
                : unlockedAffinity > unlockedBranchTier ?
                  unlockedBranchTier : unlockedAffinity - 1}
              setSelectedBranch={((i:number) => {
                setSelectedBranch(i)
                setSelectedNode(-1)
              }).bind(this, index)}
              selectedBranch={selectedBranch === index}
            />
          })}
        </div>
      </div>
      {
        selectedBranch !== -1 ? 
          getBranchDetails()
          : <div />
      }
      {
        selectedNode !== -1 ?
          <div className='requirements-container'>
            Requirements for level {selectedNode + 1}:
            <RequirementList
              requirements={props.affinityChart[selectedBranch]?.nodes[selectedNode].preReqs || []}
              updateReqProgress={(index, progress) => props.updateACNReqStatus({
                bladeId: props.bladeId,
                branchId:props.affinityChart[selectedBranch]?.branchId || -1,
                nodeId: props.affinityChart[selectedBranch]?.nodes[selectedNode].nodeId || -1,
                id: index,
                progress: progress
              })}
            />
          </div>
          : <div />
      }
    </CollapsibleComponent>
  )
}