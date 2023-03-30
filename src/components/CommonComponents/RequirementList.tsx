import { IRequirement, RequirementArea } from 'interfaces/common'
import path from 'path'
import { Link } from 'react-router-dom'
import IncrementDecrementNumber from './FormComponents/IncrementDecrementNumber'

interface IProps {
    requirements: IRequirement[],
    updateReqProgress?: (index: number, progress: number) => void
}

export const RequirementList = (props: IProps) => {

  const mapArea = (req: IRequirement) => {
    switch (req.area) {
    case RequirementArea.Blade:
    case RequirementArea['Affinity Chart Node']:
      return <div className='col-sm-6'>
        <b>
          {req.area}
        </b>
        : <Link to={`/blade/${req.reqId}`}>
          {req.requirement}
        </Link>
      </div>
    case RequirementArea.Quest:
    case RequirementArea.SideQuest:
    case RequirementArea.StartSideQuest:
      return <div className='col-sm-6'>
        <b>
          {req.area}
        </b>
        : <Link to={`/sideQuest/${req.reqId}`}>
          {req.requirement}
        </Link>
      </div>
    case RequirementArea.Monster:
      return <div className='col-sm-6'>
        <b>
          {req.area}
        </b>
        : <Link to={`/monster/${req.reqId}`}>
          {req.requirement}
        </Link>
      </div>
    case RequirementArea['Field Skills']:
      return <div className='col-sm-6'>
        <b>
          <Link to={'/bladeList'}>
            {req.area}
          </Link>
        </b>
        : {req.requirement}
      </div>
    case RequirementArea.Heart2Heart:
      return <div className='col-sm-6'>
        <b>
          {req.area}
        </b>
        : <Link to={`/heart2Heart/${req.reqId}`}>
          {req.requirement}
        </Link>
      </div>
    case RequirementArea.MercMission:
      return <div className='col-sm-6'>
        <b>
          {req.area}
        </b>
        : <Link to={`/mercMission/${req.reqId}`}>
          {req.requirement}
        </Link>
      </div>
    case RequirementArea.Other:
      return <div className='col-sm-6'>
        {req.requirement}
      </div>
    case RequirementArea['New Game Plus']:
    case RequirementArea['DLC Unlocked']:
      return <div className='col-sm-6'>
        {req.area}
      </div>
    default:
      return <div className='col-sm-6'>
        <b>{req.area}</b>: {req.requirement}
      </div>
    }
  }
  return (
    <ul>
      {props.requirements.length > 0 ? props.requirements.map((req) =>
        <li>
          <div className='row'>
            {mapArea(req)}
            {req.progress !== undefined ?
              <div className='col-sm-6'>
                <div className='row'>
                  Progress:
                  <div className='spaced-increment'>
                    <IncrementDecrementNumber
                      disabled={req.available !== undefined ? !req.available : false}
                      minimum={0}
                      maximum={req.requirementCount}
                      value={req.progress}
                      updateValue={(progress) => props.updateReqProgress ?
                        props.updateReqProgress(req.id || 0, progress) : undefined}
                    />
                  </div>
                </div>
              </div> : 
              <>
                {
                  req.requirementCount ?
                    <div className='col-sm-2'>
                      Number: {req.requirementCount}
                    </div> : <div />
                }
                {req.available !== undefined &&
                <div className='col-sm-2'>Available:
                  <img 
                    src={path.resolve(`images/helper/${req.available ?
                      'GreenCheckmark' : 'RedX'}.svg`)}
                    alt={'Available'}
                    className="availability-small-image inline-image"
                  />
                </div>}
                {req.completed !== undefined &&
                <div className='col-sm-3'>Achieved:<img 
                  src={path.resolve(`images/helper/${req.completed ?
                    'GreenCheckmark' : 'RedX'}.svg`)}
                  alt={'Completed'}
                  className="availability-small-image inline-image"
                /></div>}
              </>
            }
          </div>
        </li>
      ) : <>No requirements</>}
    </ul>
  )
}