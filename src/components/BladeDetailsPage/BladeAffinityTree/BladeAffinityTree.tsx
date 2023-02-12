import { useEffect, useRef, useState } from 'react'
import { IAffinityChartNode } from 'interfaces/AffinityChart';
import {
  IAffinityChartBranchState,
  IAffinityChartNodeState,
  IUpdateUnlocked
} from 'reduxState/interfaces/reduxState'
import CollapsibleComponent from 'components/CommonComponents/Containers/CollapsibleComponent'
import { BranchDetails } from 'components/CommonComponents/BranchDetails';
import { TreeBranch } from 'components/CommonComponents/TreeBranch';

interface IOwnProps {
  affinityChart: IAffinityChartBranchState[]
}

interface IDispatchProps {
  setBladeSkillNode: (node: IAffinityChartNode[]) => void;
  saveBladeSkillNode: (node: IUpdateUnlocked) => void;
  fetchFieldSkills: () => void;
}

export const BladeAffinityTreeView = (props: IOwnProps & IDispatchProps) => {
  const [selectedBranch, setSelectedBranch] = useState(-1);
  const toUpdate = useRef([] as IAffinityChartNodeState[]);

  const unlockNode = (branch: number, tier: number, unlocked: boolean) => {
    let updatingNodes = [] as IAffinityChartNodeState[];
    const foundNode = props.affinityChart[branch].nodes.find((n) => n.tier === tier);
    if (unlocked) {
      updatingNodes = updatingNodes.concat(foundNode ? {...foundNode, unlocked: true} : []);
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
    toUpdate.current = toUpdate.current
      .filter((node) => !updatingNodes.find((un) => un.nodeId === node.nodeId))
      .concat(updatingNodes)
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
        minOneNode={selectedBranch === 0}
      />
    </>
  }

  useEffect(() => {
    if (props.affinityChart[0] !== undefined) {
      setSelectedBranch(-1);
    }
  }, [props.affinityChart.length])

  useEffect(() => {
    return () => {
      props.saveBladeSkillNode({
        unlocked: toUpdate.current
          .filter((node) => node.unlocked)
          .map((node) => node.nodeId),
        locked: toUpdate.current
          .filter((node) => !node.unlocked)
          .map((node) => node.nodeId),
      })
      setTimeout(props.fetchFieldSkills, 1000)
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
              setSelectedBranch={setSelectedBranch.bind(this, index)}
            />
          })}
        </div>
      </div>
      {
        selectedBranch !== -1 ? 
          getBranchDetails()
          : <div />
      }
    </CollapsibleComponent>
  )
}