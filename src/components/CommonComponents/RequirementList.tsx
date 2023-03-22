import { IRequirement, RequirementArea } from 'interfaces/common'
import path from 'path'
import { Link } from 'react-router-dom'

interface IProps {
    requirements: IRequirement[]
}

export const RequirementList = (props: IProps) => {

  const mapArea = (req: IRequirement) => {
    switch (req.area) {
    case RequirementArea.Blade:
      return <div className='col-sm-6'>
        <b>
          {req.area}
        </b>
        : <Link to={`/blade/${req.reqId}`}>
          {req.requirement}
        </Link>
      </div>
    case RequirementArea.Quest:
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
    case RequirementArea.Other:
      return <div className='col-sm-6'>
        {req.requirement}
      </div>
    default:
      return <div className='col-sm-6'>
        <b>{req.area}</b>: {req.requirement}
      </div>
    }
  }
  return (
    <ul>
      {props.requirements.map((req) =>
        <li>
          <div className='row'>
            {mapArea(req)}
            {req.requirementCount &&
            <div className='col-sm-2'>
                Number: {req.requirementCount}
            </div>
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
          </div>
        </li>
      )}
    </ul>
  )
}