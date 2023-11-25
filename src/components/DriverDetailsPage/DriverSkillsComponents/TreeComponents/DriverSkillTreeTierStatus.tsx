import path from 'path';

interface IProps {
  driverUnlocked:boolean;
  unlockedTier1:number;
  unlockedTier2:number;
}

const DriverSkillTreeTierStatus = (props: IProps) => {
  return (
    <div className="branch-details-area">
      <div className="branch-details-node-area" >
        {props.driverUnlocked ?
          <>
            <img
              className="small-centered-borderless-image non-click"
              src={path.resolve('images/helper/openLock.svg')}
              alt="unlock"
            />
            <div className="driver-skill-branch-status">
              <b>Tier 1 available</b>
            </div>
          </>
          : <>
            <img
              className="small-centered-borderless-image non-click"
              src={path.resolve('images/helper/closedLock.svg')}
              alt="lock"
            />
            <div className="driver-skill-branch-status">
                To unlock tier, progress the story.
              <br />
              <b>Driver currently unavailable.</b>
            </div>
          </>
        }
      </div>
      <div className="branch-details-node-area" >
        {props.unlockedTier1 >= 2 ?
          <>
            <img
              className="small-centered-borderless-image non-click"
              src={path.resolve('images/helper/openLock.svg')}
              alt="unlock"
            />
            <div className="driver-skill-branch-status">
                To unlock tier, obtain 5 nodes of lower levels.
              <br />
              <b>Tier 2 available</b>
            </div>
          </>
          : <>
            <img
              className="small-centered-borderless-image non-click"
              src={path.resolve('images/helper/closedLock.svg')}
              alt="lock"
            />
            <div className="driver-skill-branch-status">
                To unlock tier, obtain 2 nodes of lower level.
              <br />
              <b>{2 - props.unlockedTier1} to go!</b>
            </div>
          </>
        }
      </div>
      <div className="branch-details-node-area" >
        {props.unlockedTier1 + props.unlockedTier2 >= 5 ?
          <>
            <img
              className="small-centered-borderless-image"
              src={path.resolve('images/helper/openLock.svg')}
              alt="unlock"
            />
            <div className="driver-skill-branch-status">
                To unlock tier, obtain 5 nodes of lower levels.
              <br />
              <b>Tier 3 available</b>
            </div>
          </>
          : <>
            <img
              className="small-centered-borderless-image"
              src={path.resolve('images/helper/closedLock.svg')}
              alt="lock"
            />
            <div className="driver-skill-branch-status">
                To unlock tier, obtain 5 nodes of lower levels.
              <br />
              <b>{5 - props.unlockedTier1 - props.unlockedTier2} to go!</b>
            </div>
          </>
        }
      </div>
    </div>
  )
}

export default DriverSkillTreeTierStatus;