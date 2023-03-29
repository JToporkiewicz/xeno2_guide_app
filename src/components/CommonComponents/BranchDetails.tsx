import { ReactElement } from 'react'
import LockOverlay from '../UnavailableDataComponents/Overlays/LockOverlay'
import UnlockOverlay from '../UnavailableDataComponents/Overlays/UnlockOverlay'

interface IOwnProps {
  nodes: {
    unlocked: boolean,
    available?:boolean,
    nodeId: number,
    tier: number,
    Body:ReactElement
  }[],
  availableTier: number,
  updateNode: (tier: number, unlock:boolean) => void,
  minOneNode?:boolean,
  onMouseEnter?:(index:number) => void
}

export const BranchDetails = (props: IOwnProps) => {
  return (
    <div className="branch-details">
      <div className="branch-details-track" />
      <div className="branch-details-area">
        {props.nodes?.map((node, index) => 
          <div
            key={'details ' + index}
            className="branch-details-node-area"
            onMouseEnter={() => props.onMouseEnter ? props.onMouseEnter(index) : undefined}
          >
            {
              props.minOneNode && node.tier === 1 ?
                <div/>
                : 
                node.unlocked ?
                  <LockOverlay
                    id={node.nodeId}
                    updateGameState={() => props.updateNode(node.tier, false)} />
                  : <UnlockOverlay
                    id={node.nodeId}
                    updateGameState={() => props.updateNode(node.tier, true)} />
            }
            
            {node.available === false || node.tier > props.availableTier ?
              <div className="unavailable"/> : null }
            <div className={`branch-details-node ${node.unlocked ? 'unlocked' : ''}`}>
              {node.Body}
            </div>
          </div>

        )}
      </div>
    </div>
  )
}