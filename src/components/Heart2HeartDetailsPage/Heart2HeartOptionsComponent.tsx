import CollapsibleComponent from 'components/CommonComponents/Containers/CollapsibleComponent'
import { IHeart2Heart } from 'interfaces'

interface IProps {
  heart2Heart: IHeart2Heart
}

const Heart2HeartOptionDetails = (option:any, index: number) => {
  const optionRewards = Object.entries(option)
    .filter((entry) => entry[0] !== 'Text')
  return <div className="h2h-option-details">
    <i><b>{option.Text}</b></i>
    <br/>
    <b>Rewards for option {index}: </b>
    <ul>
      {optionRewards.length > 0 ?
        optionRewards.map((rewards:any) =>
          <li key={'option' + index + 'rewards' + rewards.length}>
            {rewards[0]}:
            <ul>
              {Object.entries(rewards[1]).map((details:any) =>
                <li key={'option' + index + 'rewardDetails' + details[1].length}>
                  {details[0]}: {details[1]}
                </li>)
              }
            </ul>
          </li>
        )
        : <>None</>
      }
    </ul>
  </div>
}

export const Heart2HeartOptions = (props:IProps) => {
  const options = props.heart2Heart.Outcomes;
  return <CollapsibleComponent header="Options and Rewards">
    <>
      {options['Option 1'] && <div className="h2h-options">
        {options['Option 1'] && Heart2HeartOptionDetails(options['Option 1'], 1)}
        {options['Option 2'] && Heart2HeartOptionDetails(options['Option 2'], 2)}
      </div>}
      {options['All'] && <div className="h2h-all-rewards">
        <b>Rewards for all options: </b>
        <ul>
          {options['All'].map((rewards:any) =>
            Object.entries(rewards).map((details:any) =>
              <li key={'rewardDetails' + details[1].length}>
                {details[0]}:
                <ul>
                  {Object.entries(details[1]).map((det) =>
                    <li key={'rewardDetailsLength' + det[1]}>{det[0]}: {det[1]}</li>
                  )}
                </ul>
              </li>)
          )}
        </ul>
      </div>}
    </>
  </CollapsibleComponent>
}