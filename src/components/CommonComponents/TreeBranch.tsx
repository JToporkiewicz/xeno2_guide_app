import path from 'path';

interface IBranchNodes {
  tier: number,
  unlocked: boolean,
  available?: boolean
}

interface IOwnProps {
  index: number,
  treeBranchesCount: number,
  nodesPerBranch:number,
  branchName?:string,
  nodes: IBranchNodes[],
  availableTier?: number,
  allAvailable?:boolean,
  setSelectedBranch:() => void
}


export const TreeBranch = (props: IOwnProps) => {
  const rotation = 270 + (450-270) / (props.treeBranchesCount - 1) * props.index;

  const getBranchNodes = (nodes: IBranchNodes[], availableTier: number) => {
    const nodeComponents = [];

    for (let i = 1; i <= props.nodesPerBranch; i++) {
      const node = nodes.find((n) => n.tier === i);
      if (node) {
        const nodeStatus = !props.allAvailable && (node.tier > availableTier ||
          node.available === false) ?
          'unavailable' : node.unlocked ?
            'unlocked' : 'locked'
        nodeComponents.push(
          <div
            key={'node ' + i}
            className={`chart-node chart-node-${nodeStatus}`}
          >
            {nodeStatus === 'unavailable' &&
              <img
                className="node-image"
                src={path.resolve('images/helper/closedLock.svg')}
                alt="lock"
              />
            }
            {nodeStatus === 'unlocked' &&
              <img
                className="node-image"
                src={path.resolve('images/helper/Checkmark.svg')}
                alt="lock"
              />
            }
          </div>
        )
      } else {
        nodeComponents.push(
          <div key={'node ' + i} className="empty-chart-node"/>
        )
      }
    }

    return nodeComponents.reverse();
  }

  return <div
    className="branch-area"
    style={{transform: `rotate(${rotation}deg)`}}
  >
    <div className="branch-label">{props.branchName ?
      props.branchName.replace('-', '\u2011')
      : ''}
    </div>
    <div className="branch-body" onClick={() => props.setSelectedBranch()}>
      <div className="branch-name"/>
      <div className="branch-track" />
      <div className="branch-node-area">
        {
          getBranchNodes(
            props.nodes,
            props.availableTier !== undefined ?
              props.availableTier
              : props.nodesPerBranch
          )
        }        
      </div>

    </div>
  </div>
}