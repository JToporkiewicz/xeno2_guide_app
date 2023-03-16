import CollapsibleComponent from 'components/CommonComponents/Containers/CollapsibleComponent'
import { IQuest } from 'interfaces';

interface IOwnProps {
  quest: IQuest
}

export const SideQuestRewardsComponent = (props:IOwnProps) => {
  const rewardsForAllRoutes = props.quest.Rewards.filter((point:string) =>
    !point.startsWith('A:') && !point.startsWith('B:'));
  const rewardsForRouteA:string|undefined = props.quest.Rewards.find(
    (point:string) => point.startsWith('A:')
  );
  const rewardsForRouteB:string|undefined = props.quest.Rewards.find(
    (point:string) => point.startsWith('B:')
  );
  return <CollapsibleComponent header="Rewards">
    <div className='row'>
      <div className='col-sm-4'>
        <b>Rewards {(rewardsForRouteA || rewardsForRouteB) && 'for all routes:'}</b>
        <ul>
          {rewardsForAllRoutes.map((item:string, index:number) =>
            <li key={'rewardsAll'+index}>{item}</li>
          )}
        </ul>
      </div>
      {rewardsForRouteA && 
        <div className='col-sm-4'>
          <b>Rewards for route A:</b>
          <ul>
            {rewardsForRouteA && rewardsForRouteA.replaceAll('A:', '').split(', ')
              .map((item:string, index:number) =>
                <li key={'rewardsA'+index}>{item}</li>
              )}
          </ul>
        </div>
      }
      {rewardsForRouteB &&
        <div className='col-sm-4'>
          <b>Rewards for route B:</b>
          <ul>
            {rewardsForRouteB && rewardsForRouteB.replaceAll('B:', '').split(', ')
              .map((item:string, index:number) =>
                <li key={'rewardsB'+index}>{item}</li>
              )}
          </ul>
        </div>
      }
    </div>

  </CollapsibleComponent>
}