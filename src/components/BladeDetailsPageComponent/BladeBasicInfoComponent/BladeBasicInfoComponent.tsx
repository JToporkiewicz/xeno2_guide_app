import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { IHeart2Heart, IItem, IItemType } from 'interfaces'
import { IBladeState, IQuestState } from 'reduxState/interfaces/reduxState'
import CollapsibleComponent from 'components/CommonComponents/Containers/CollapsibleComponent'
import path from 'path';

interface IOwnProps {
  bladeDetails:IBladeState,
  item1?: IItem | undefined,
  item2?: IItem | undefined,
  itemType1?: IItemType | undefined,
  itemType2?: IItemType | undefined
  heart2Heart?: IHeart2Heart | undefined,
  quest?: IQuestState | undefined
}

interface IDispatchProps {
  updateBladeUnlocked: (payload:IBladeState) => void;
  saveBladeStatus: (payload:IBladeState) => void;
  updateQuestStatus: (payload:IQuestState) => void;
  saveQuestStatus: (payload:IQuestState) => void;
  updateHeart2HeartStatus: (payload:IHeart2Heart) => void;
  saveHeart2HeartStatus: (payload:IHeart2Heart) => void;
}

export const BladeBasicInfoComponentView = (props: IOwnProps & IDispatchProps) => {
  const bladeToUpdate = useRef(props.bladeDetails);
  const questToUpdate = useRef(props.quest);
  const h2hToUpdate = useRef(props.heart2Heart);

  const [questOptionsOpen, setQuestOptionsOpen] = useState(false);

  const updateBladeUnlocked = () => {
    bladeToUpdate.current = {
      ...props.bladeDetails,
      unlocked: !props.bladeDetails.unlocked
    }
    props.updateBladeUnlocked({
      ...props.bladeDetails,
      unlocked: !props.bladeDetails.unlocked
    })

    if(props.quest) {
      questToUpdate.current = {
        ...props.quest,
        Status: 'NOT STARTED'
      }

      props.updateQuestStatus({
        ...props.quest,
        Status: 'NOT STARTED'
      })
    }
    if(props.heart2Heart) {
      h2hToUpdate.current = {
        ...props.heart2Heart,
        Viewed: false
      }

      props.updateHeart2HeartStatus({
        ...props.heart2Heart,
        Viewed: false
      })
    }
  }

  const updateQuestCompleted = (status:string) => {
    if(props.quest) {
      questToUpdate.current = {
        ...props.quest,
        Status: status
      }

      props.updateQuestStatus({
        ...props.quest,
        Status: status
      })
    }
  }

  const updateH2HViewed = () => {
    if(props.heart2Heart) {
      h2hToUpdate.current = {
        ...props.heart2Heart,
        Viewed: !props.heart2Heart.Viewed
      }

      props.updateHeart2HeartStatus({
        ...props.heart2Heart,
        Viewed: !props.heart2Heart.Viewed
      })
    }
  }

  useEffect(() => {
    return () => {
      props.saveBladeStatus(bladeToUpdate.current);
      if (questToUpdate.current) {
        props.saveQuestStatus(questToUpdate.current);
      }
      if (h2hToUpdate.current) {
        props.saveHeart2HeartStatus(h2hToUpdate.current);
      }
    }
  }, [])

  return (
    <CollapsibleComponent header={'Basic information'}>
      <div className="row">
        <div className="basic-info-image-area">
          <img
            src={path.resolve(`images/blade/${props.bladeDetails.name.replace(/\s+/g, '')}.jpeg`)}
            alt={props.bladeDetails.name}
            className="basic-info-image"
          />
        </div>
        <div className="col-sm-8 fit-contents">
          <div className="row">
            <div className="col-sm-4">
              <b>Gender: </b>{props.bladeDetails.gender}
            </div>
            <div className="col-sm-4">
              <b>Type: </b>{props.bladeDetails.type}
            </div>
            <div className="col-sm-4">
              <b>Aux Cores: </b>{props.bladeDetails.auxCoreCount}
            </div>
          </div>
          <div className="row">
            <div className="col-sm-4">
              <b>Weapon: </b>{props.bladeDetails.weapon}
            </div>
            <div className="col-sm-4">
              <b>Element: </b>{props.bladeDetails.element}
            </div>
            <div className="col-sm-4">
              <b>Role: </b>{props.bladeDetails.role}
            </div>
          </div>
          <>
            <b>Favourite Items: </b>{
              props.item1 && props.item2 ? 
                <>
                  {' '}<Link to={`/item/${props.item1.id}`}>{props.item1.Name}</Link>, 
                  {' '}<Link to={`/item/${props.item2.id}`}>{props.item2.Name}</Link>
                </>
                : 'undefined'
            }
          </>
          <br />
          <>
            <b>Favourite Item Types: </b>{
              props.itemType1 && props.itemType2 ?
                <>
                  {' '}
                  <Link to={`/itemType/${props.itemType1.id}`}>{props.itemType1.ItemType}</Link>, 
                  {' '}
                  <Link to={`/itemType/${props.itemType2.id}`}>{props.itemType2.ItemType}</Link>
                </>
                : 'undefined'
            }
          </>
          <div className="centered-button">
            <div className="details-unlock-section">
              <b>Unlocked: </b>
              <br/>
              <div
                className={`large-unlock-button${!props.bladeDetails.available ?
                  ' disabledButton' : ''}`}
                onClick={() => props.bladeDetails.available ?
                  updateBladeUnlocked() : {}}
              >
                {props.bladeDetails.unlocked &&
                  <img
                    src={path.resolve('images/helper/Checkmark.svg')}
                    alt={'Unlock'}
                    className="unlock-button-image"
                  />
                }
              </div>
              <div>Available: {props.bladeDetails.available ? 'Yes' : 'No'}</div>
            </div>

            {props.heart2Heart &&
            <div className="details-unlock-section">
              <b>Heart 2 Heart: </b>
              <br/>
              <div
                className={`large-unlock-button${
                  !props.heart2Heart.Available || !props.bladeDetails.unlocked ?
                    ' disabledButton' : ''}`}
                onClick={() => props.heart2Heart?.Available && props.bladeDetails.unlocked ?
                  updateH2HViewed() : {}}
              >
                {props.heart2Heart?.Viewed &&
                  <img
                    src={path.resolve('images/helper/Checkmark.svg')}
                    alt={'Unlock'}
                    className="unlock-button-image"
                  />
                }
              </div>
              <Link to={`/h2h/${props.heart2Heart.id}`}>
                {props.heart2Heart.Title}
              </Link>
              <br/>
              <div>
                Available: {props.heart2Heart.Available && props.bladeDetails.unlocked ?
                  'Yes' : 'No'}
              </div>
            </div>          
            }
            {props.quest &&
              <div className="details-unlock-section">
                <b>Blade Quest: </b>
                <br/>
                <div
                  className={`large-unlock-button${
                    !props.quest.Available || !props.bladeDetails.unlocked?
                      ' disabledButton' : ''}`}
                  onClick={() => props.quest?.Available && props.bladeDetails.unlocked ?
                    setQuestOptionsOpen(!questOptionsOpen) : {}}
                >
                  {props.quest.Status === 'STARTED' &&
                    <img
                      src={path.resolve('images/helper/Plus.svg')}
                      alt={'Unlock'}
                      className="unlock-button-image"
                    />
                  }
                  {props.quest.Status === 'FINISHED' &&
                    <img
                      src={path.resolve('images/helper/Checkmark.svg')}
                      alt={'Unlock'}
                      className="unlock-button-image"
                    />
                  }
                  {questOptionsOpen &&
                    <div className='hover-options'>
                      <div
                        className='large-unlock-button hover-version'
                        onClick={() => {
                          setQuestOptionsOpen(false)
                          updateQuestCompleted('NOT STARTED')
                        }}
                      />
                      <div
                        className='large-unlock-button hover-version'
                        onClick={() => {
                          setQuestOptionsOpen(false)
                          updateQuestCompleted('STARTED')
                        }}
                      >
                        <img
                          src={path.resolve('images/helper/Plus.svg')}
                          alt={'Unlock'}
                          className="unlock-button-image"
                        />
                      </div>
                      <div
                        className='large-unlock-button hover-version'
                        onClick={() => {
                          setQuestOptionsOpen(false)
                          updateQuestCompleted('FINISHED')
                        }}
                      >
                        <img
                          src={path.resolve('images/helper/Checkmark.svg')}
                          alt={'Unlock'}
                          className="unlock-button-image"
                        />
                      </div>
                    </div>
                  }
                </div>
                <Link to={`/quest/${props.quest?.id}`}>
                  {props.quest?.Name}
                </Link>
                <br/>
                <div>
                  Available: {props.quest.Available && props.bladeDetails.unlocked ? 'Yes' : 'No'}
                </div>
              </div>
            }
          </div>

        </div>
      </div>
    </CollapsibleComponent>
  )
}