interface IProps {
  unlockedTier1:number;
  unlockedTier2:number;
}

const DriverSkillTreeTierStatus = (props: IProps) => {
  return (
    <div className="row">
      <div className="col-sm-4" >
        <div className="driver-skill-node">
          <img
            className="small-centered-borderless-image non-click"
            src="/images/helper/openLock.png"
            alt="unlock"
          />
          <div className="driver-skill-branch-status">
            <b>Tier 1 available</b>
          </div>
        </div>
      </div>
      <div className="col-sm-4" >
        <div className="driver-skill-node">
          {props.unlockedTier1 >= 2 ?
            <>
              <img
                className="small-centered-borderless-image non-click"
                src="/images/helper/openLock.png"
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
                src="/images/helper/closedLock.png"
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
      </div>
      <div className="col-sm-4" >
        <div className="driver-skill-node">
          {props.unlockedTier1 + props.unlockedTier2 >= 5 ?
            <>
              <img
                className="small-centered-borderless-image"
                src="/images/helper/openLock.png"
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
                src="/images/helper/closedLock.png"
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
    </div>
  )
}

export default DriverSkillTreeTierStatus;