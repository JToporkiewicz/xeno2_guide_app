import { DifficultyIcons } from 'components/CommonComponents/DifficultyIcons'
import { OptionsCheckbox } from 'components/CommonComponents/FormComponents/OptionsCheckbox'
import path from 'path'
import { IChallengeBattleAvailability } from 'reduxState/interfaces/availabilityState'

interface IOwnProps {
  challengeBattle: IChallengeBattleAvailability | undefined,
  updateChallengeStatus: (challId: number, beaten: boolean) => void,
  selectChallenge: (index: number) => void
}

export const ChallengeBattleDetails = (props:IOwnProps) => {
  const {challengeBattle, updateChallengeStatus} = props;
  if(!challengeBattle) {
    return <div />
  }

  return <>
    <hr />
    <div>
      <img
        src={path.resolve('images/helper/Close.svg')}
        alt="close"
        className="close-details"
        onClick={() => props.selectChallenge(0)}
      />
      <h3>{challengeBattle.name}</h3>
      <div className='row'>
        <div className='col-sm-4'>
          <OptionsCheckbox
            title='Beaten: '
            available={challengeBattle.available}
            unlocked={challengeBattle.beaten}
            onClick={() => updateChallengeStatus(
              challengeBattle.id,
              !challengeBattle.beaten)}
          />
        </div>
        <div className='col-sm-4'>
          <div>
            <b>Difficulty: </b>
            <DifficultyIcons
              difficulty={challengeBattle.difficulty}
              id={challengeBattle.name+' details'}
            />
          </div>
          <p>
            <b>Time Limit: </b>
            {challengeBattle.timeLimit}
          </p>
          <p>
            <b>Waves: </b>
            {challengeBattle.waves}
          </p>
        </div>
        <div className='col-sm-4'>
          <p>
            <b>Max level: </b>
            {challengeBattle.maxLv}
          </p>
          <p>
            <b>Blade powers: </b>
            {challengeBattle.bladePowers}
          </p>
          <p>
            <b>Driver restrictions: </b>
            {challengeBattle.driverRestrictions}
          </p>
        </div>
      </div>
    </div>
    <hr />
  </>
}