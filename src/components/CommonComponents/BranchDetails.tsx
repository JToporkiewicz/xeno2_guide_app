import { ReactElement } from 'react'
import LockOverlay from '../UnavailableDataComponents/Overlays/LockOverlay'
import UnlockOverlay from '../UnavailableDataComponents/Overlays/UnlockOverlay'

interface IOwnProps {
  nodes: {
    Unlocked: boolean,
    Available?:boolean,
    id: number,
    Tier: number,
    Body:ReactElement
  }[],
  availableTier: number,
  updateNode: (tier: number, unlock:boolean) => void,
  minOneNode?:boolean
}

export const BranchDetails = (props: IOwnProps) => {
  return (
    <div className="branch-details">
      <div className="branch-details-track" />
      <div className="branch-details-area">
        {props.nodes?.map((node, index) => 
          <div key={'details ' + index} className="branch-details-node-area">
            {
              props.minOneNode && node.Tier === 1 ?
                <div/>
                : 
                node.Unlocked ?
                  <LockOverlay
                    id={node.id}
                    updateGameState={() => props.updateNode(node.Tier, false)} />
                  : <UnlockOverlay
                    id={node.id}
                    updateGameState={() => props.updateNode(node.Tier, true)} />
            }
            
            {node.Available === false || node.Tier > props.availableTier ?
              <div className="unavailable"/> : null }
            <div className={`branch-details-node ${node.Unlocked ? 'unlocked' : ''}`}>
              {node.Body}
            </div>
          </div>

        )}
      </div>
    </div>
  )
}