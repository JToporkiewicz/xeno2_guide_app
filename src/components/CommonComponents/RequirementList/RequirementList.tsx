import { RequirementArea } from 'interfaces/common'
import path from 'path'
import IncrementDecrementNumber from '../FormComponents/IncrementDecrementNumber'
import { IStoryProgress } from 'interfaces'
import { IMajorLocations } from 'reduxState/interfaces/reduxState'
import { LinkSelected } from '../LinkSelected'
import { Routes } from 'helpers/routesConst'
import { IRequirementAvailability } from 'reduxState/interfaces/availabilityState'

interface IOwnProps {
  requirements: IRequirementAvailability[],
  updateReqProgress?: (index: number, progress: number, area?: string) => void
}

interface IProps {
  storyProgress: IStoryProgress,
  locations: IMajorLocations[]
}

export const RequirementListComponent = (props: IProps & IOwnProps) => {

  const mapArea = (req: IRequirementAvailability) => {
    switch (req.area) {
    case RequirementArea.Blade:
    case RequirementArea['Affinity Chart Node']:
      return <div className='col-sm-6'>
        <b>
          {req.area}
        </b>
        :
        <LinkSelected
          to={Routes.BLADE + req.reqId}
          area='blade'
          id={req.reqId || 0}
        >
          {req.requirement}
        </LinkSelected>
      </div>
    case RequirementArea.Quest:
    case RequirementArea.SideQuest:
    case RequirementArea.StartSideQuest:
      return <div className='col-sm-6'>
        <b>
          {req.area}
        </b>
        :
        <LinkSelected
          to={Routes.SIDE_QUEST + req.reqId}
          area='sideQuest'
          id={req.reqId || 0}
        >
          {req.requirement}
        </LinkSelected>
      </div>
    case RequirementArea.Monster:
      return <div className='col-sm-6'>
        <b>
          {req.area}
        </b>
        : 
        <LinkSelected
          to={Routes.MONSTER_LIST}
          area='monster'
          id={req.reqId || 0}
        >
          {req.requirement}
        </LinkSelected>
      </div>
    case RequirementArea['Field Skills']:
      return <div className='col-sm-6'>
        <b>
          <LinkSelected
            to={Routes.BLADE_LIST}
            area='bladeList'
            id={0}
          >
            {req.area}
          </LinkSelected>
        </b>
        : {req.requirement}
      </div>
    case RequirementArea.Heart2Heart:
      return <div className='col-sm-6'>
        <b>
          {req.area}
        </b>
        :
        <LinkSelected
          to={Routes.HEART_2_HEART_LIST}
          area='heart2Heart'
          id={req.reqId || 0}
        >
          {req.requirement}
        </LinkSelected>
      </div>
    case RequirementArea.MercMission:
      return <div className='col-sm-6'>
        <b>
          {req.area}
        </b>
        :
        <LinkSelected
          to={Routes.MERC_MISSION_LIST}
          area='mercMission'
          id={req.reqId || 0}
        >
          {req.requirement}
        </LinkSelected>
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
    case RequirementArea['Nation Dev Level']:
      const reqText = req.requirement.split(':')
      return <div className='col-sm-6'>
        <b>{reqText[0]}</b>: {reqText[1]}
      </div>
    default:
      return <div className='col-sm-6'>
        <b>{req.area}</b>: {req.requirement}
      </div>
    }
  }

  const getDisabledStatus = (req: IRequirementAvailability) => {
    if ([String(RequirementArea['Nation Dev Level'])].includes(req.area)) {
      const reqText = req.requirement.split(':')
      const area = props.locations.find((loc) => loc.Name === reqText[0])
      if (area !== undefined) {
        return area.StoryProgress > props.storyProgress.Chapter
      }
    } else if (req.available !== undefined) {
      return !req.available
    }
    return false
  }

  return (
    <ul>
      {props.requirements.length > 0 ? props.requirements.map((req, index) =>
        <li key={'req'+index}>
          <div className='row'>
            {mapArea(req)}
            {req.progress !== undefined ?
              <div className='col-sm-6'>
                <div className='row'>
                  {req.completed !== undefined &&
                    <div className='col-sm-4'>Achieved:<img 
                      src={path.resolve(`images/helper/${req.completed ?
                        'GreenCheckmark' : 'RedX'}.svg`)}
                      alt={'Completed'}
                      className="availability-small-image inline-image"
                    /></div>}
                  <div className='col-sm-2'>
                  Progress:
                  </div>
                  <div className='col-sm-6 spaced-increment'>
                    <IncrementDecrementNumber
                      disabled={getDisabledStatus(req)}
                      minimum={[String(RequirementArea['Merc Level'])]
                        .includes(req.area) ? 1 : 0}
                      maximum={req.area === RequirementArea['Story Progress'] ? 10 :
                        req.area === RequirementArea['Nation Dev Level'] ? 5 : req.requirementCount}
                      required={req.requirementCount}
                      value={req.progress}
                      updateValue={(progress) => props.updateReqProgress ?
                        props.updateReqProgress(
                          req.id || req.reqId || 0,
                          progress,
                          req.area) : undefined}
                    />
                  </div>
                </div>
              </div> : 
              <>
                {req.completed !== undefined &&
                <div className='col-sm-2'>Achieved:<img 
                  src={path.resolve(`images/helper/${req.completed ?
                    'GreenCheckmark' : 'RedX'}.svg`)}
                  alt={'Completed'}
                  className="availability-small-image inline-image"
                /></div>}
                {req.available !== undefined &&
                <div className='col-sm-2'>Available:
                  <img 
                    src={path.resolve(`images/helper/${req.available ?
                      'GreenCheckmark' : 'RedX'}.svg`)}
                    alt={'Available'}
                    className="availability-small-image inline-image"
                  />
                </div>}
                {
                  req.requirementCount && req.area !== RequirementArea['Story Progress'] ?
                    <div className='col-sm-2'>
                      Number: {req.requirementCount}
                    </div> : <div />
                }
              </>
            }
          </div>
        </li>
      ) : <>No requirements</>}
    </ul>
  )
}