import { useEffect, useRef, useState } from 'react'
import { IAffinityChartNode } from 'interfaces/AffinityChart';
import { IAffinityChartNodeState, IAffinityChartState } from 'reduxState/interfaces/reduxState'
import CollapsibleComponent from 'components/CommonComponents/Containers/CollapsibleComponent'
import { BranchDetails } from 'components/CommonComponents/BranchDetails';
import { TreeBranch } from 'components/CommonComponents/TreeBranch';

interface IOwnProps {
  affinityChart: IAffinityChartState
}

interface IDispatchProps {
  setBladeSkillNode: (node: IAffinityChartNode[]) => void;
  saveBladeSkillNode: (node: IAffinityChartNode) => void;
  fetchFieldSkills: () => void;
}

export const BladeAffinityTreeView = (props: IOwnProps & IDispatchProps) => {
  const [selectedBranch, setSelectedBranch] = useState(-1);
  const toUpdate = useRef([] as IAffinityChartNodeState[]);

  const unlockNode = (branch: number, tier: number, unlocked: boolean) => {
    let updatingNodes = [] as IAffinityChartNodeState[];
    const foundNode = props.affinityChart.branches[branch].nodes.find((n) => n.Tier === tier);
    if (unlocked) {
      updatingNodes = updatingNodes.concat(foundNode ? {...foundNode, Unlocked: true} : []);
    } else {
      updatingNodes = updatingNodes.concat(foundNode ? [{...foundNode, Unlocked: false}].concat(
        props.affinityChart.branches[branch].nodes.filter((n) => n.Tier > foundNode.Tier)
          .map((n) => ({ ...n, Unlocked: false }))
      ) : []);
      if (branch === 0) {
        updatingNodes = updatingNodes.concat(...props.affinityChart.branches
          .map((b) => [...b.nodes.filter((n) => n.Tier >= tier)]
            .map((n) => ({...n, Unlocked: false}))))
      }
    }
    props.setBladeSkillNode(updatingNodes.map((node) => ({
      ...node,
      Effect: JSON.stringify(node.Effect)
    })))
    toUpdate.current = toUpdate.current
      .filter((node) => !updatingNodes.find((un) => un.id === node.id))
      .concat(updatingNodes)
  }

  const getBranchDetails = () => {
    const selectedDetails = props.affinityChart.branches[selectedBranch];
    const unlockedAffinity =
      props.affinityChart.branches[0]?.nodes.find((n) => !n.Unlocked)?.Tier || 6;
    const unlockedBranchTier =
      selectedDetails?.nodes.find((n) => !n.Unlocked)?.Tier || 6;
    return <>
      <hr />
      <h2>{props.affinityChart.branches[selectedBranch]?.branchName || ''}</h2>
      <BranchDetails
        availableTier={selectedDetails?.branchName === 'Affinity' ?
          unlockedAffinity
          : unlockedAffinity > unlockedBranchTier ?
            unlockedBranchTier : unlockedAffinity - 1}
        nodes={selectedDetails?.nodes.map((n) => ({
          id: n.id,
          Unlocked: n.Unlocked,
          Available: n.Available,
          Tier: n.Tier,
          Body: <div
            key={'nodeDetails ' + n.id}
          >
            <b>Level:</b> {n.SkillLevel} | <b>Tier:</b> {n.Tier}
            <br/>
            <b>Effect:</b>
            <br/>
            {n.Effect && n.Effect.map((e:any, index:number) =>
              <div key={'effect ' + n.id + '->' + index}>{e}<br/></div>)
            }
          </div>
        }))}
        updateNode={unlockNode.bind(this, selectedBranch)}
        minOneNode={selectedBranch === 0}
      />
    </>
  }

  useEffect(() => {
    if (props.affinityChart.branches[0] !== undefined) {
      setSelectedBranch(-1);
    }
  }, [props.affinityChart.branches.length])

  useEffect(() => {
    return () => {
      toUpdate.current.forEach((node:IAffinityChartNodeState) =>
        props.saveBladeSkillNode({
          id: node.id,
          Name: node.Name,
          SkillLevel: node.SkillLevel,
          Effect: JSON.stringify(node.Effect),
          Available: node.Available,
          Unlocked: node.Unlocked
        })
      )
      setTimeout(props.fetchFieldSkills, 1000)
    }
  }, [])

  return (
    <CollapsibleComponent
      header={'Affinity Chart'}
    >
      <div className="tree-wrapper">
        <div className="tree-area">
          {props.affinityChart.branches.map((b, index) => {
            const unlockedAffinity =
              props.affinityChart.branches[0].nodes.find((n) => !n.Unlocked)?.Tier || 6;
            const unlockedBranchTier =
              b.nodes.find((n) => !n.Unlocked || !n.Available)?.Tier || 6;
            return <TreeBranch
              key={'branch ' + index}
              index={index}
              treeBranchesCount={props.affinityChart.branches.length}
              nodesPerBranch={5}
              branchName={b.branchName}
              nodes={b.nodes.map((node) => ({
                tier: node.Tier,
                unlocked: node.Unlocked,
                available: node.Available
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