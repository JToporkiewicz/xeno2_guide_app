import { useEffect, useRef } from 'react'
import { IItem, IItemType, IStoryProgress } from 'interfaces'
import { IBladeState, IUpdateUnlocked } from 'reduxState/interfaces/reduxState'
import CollapsibleComponent from 'components/CommonComponents/Containers/CollapsibleComponent'
import path from 'path';
import { OptionsCheckbox } from 'components/CommonComponents/FormComponents/OptionsCheckbox';
import { IUpdateH2HStatus } from 'reduxState/interfaces/heart2Hearts'
import { IUpdateQuestStatus } from 'reduxState/interfaces/quest'
import { LinkSelected } from 'components/CommonComponents/LinkSelected'
import { Routes } from 'helpers/routesConst';
import {
  IBladeAvailability,
  IHeart2HeartAvailability,
  IQuestAvailability
} from 'reduxState/interfaces/availabilityState';

interface IOwnProps {
  bladeDetails:IBladeAvailability,
  item1?: IItem | undefined,
  item2?: IItem | undefined,
  itemType1?: IItemType | undefined,
  itemType2?: IItemType | undefined
  heart2Heart?: IHeart2HeartAvailability | undefined,
  quest?: IQuestAvailability | undefined,
  storyProgress: IStoryProgress
}

interface IDispatchProps {
  updateBladeUnlocked: (payload:IBladeState | IBladeAvailability) => void;
  saveBladeStatus: (payload:IUpdateUnlocked) => void;
  updateQuestStatus: (payload:IUpdateQuestStatus) => void;
  saveQuestStatus: (payload:IUpdateQuestStatus[]) => void;
  updateHeart2HeartStatus: (payload:IUpdateH2HStatus) => void;
  saveHeart2Hearts: (payload:IUpdateUnlocked) => void;
}

export const BladeBasicInfoComponentView = (props: IOwnProps & IDispatchProps) => {
  const bladeToUpdate = useRef(undefined as IBladeAvailability | undefined);
  const questToUpdate = useRef(undefined as IQuestAvailability | undefined);
  const h2hToUpdate = useRef(undefined as IHeart2HeartAvailability | undefined);

  const updateBladeUnlocked = () => {
    bladeToUpdate.current = {
      ...props.bladeDetails,
      unlocked: !props.bladeDetails.unlocked
    }
    props.updateBladeUnlocked({
      ...props.bladeDetails,
      unlocked: !props.bladeDetails.unlocked
    })

    if(!props.bladeDetails.unlocked && props.quest) {
      questToUpdate.current = {
        ...props.quest,
        Status: 'NOT STARTED'
      }

      props.updateQuestStatus({
        questId: props.quest.id,
        status: 'NOT STARTED'
      })
    }
    if(!props.bladeDetails.unlocked && props.heart2Heart) {
      h2hToUpdate.current = {
        ...props.heart2Heart,
        Viewed: false
      }

      props.updateHeart2HeartStatus({
        id: props.heart2Heart.id,
        Viewed: false
      })
    }
  }

  const updateQuestCompleted = (status:string | boolean) => {
    if(props.quest && typeof status === 'string') {
      questToUpdate.current = {
        ...props.quest,
        Status: status
      }

      props.updateQuestStatus({
        questId: props.quest.id,
        status
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
        id: props.heart2Heart.id,
        Viewed: !props.heart2Heart.Viewed
      })
    }
  }

  useEffect(() => {
    return () => {
      if (bladeToUpdate.current) {
        props.saveBladeStatus({
          [bladeToUpdate.current.unlocked ? 'unlocked' : 'locked']: [bladeToUpdate.current.id]
        });
      }
      if (questToUpdate.current) {
        props.saveQuestStatus([{
          questId: questToUpdate.current.id,
          status: questToUpdate.current.Status
        }]);
      }
      if (h2hToUpdate.current) {
        props.saveHeart2Hearts({
          [h2hToUpdate.current.Viewed ? 'unlocked' : 'locked']: [h2hToUpdate.current.id]
        });
      }
    }
  }, [])

  return (
    <CollapsibleComponent header={'Basic information'}>
      <div className="row">
        <div className="basic-info-image-area">
          <img
            src={path.resolve(`images/blade/${props.bladeDetails.name.replace(/\s+/g, '')
              .replace('(Awakened)', '')}.jpeg`)}
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
                  {' '}
                  <LinkSelected
                    to={Routes.ITEMS}
                    id={props.item1?.id || 0}
                    area='item'
                  >
                    {props.item1.Name}
                  </LinkSelected>,
                  {' '}
                  <LinkSelected
                    to={Routes.ITEMS}
                    id={props.item2?.id || 0}
                    area='item'
                  >
                    {props.item2.Name}
                  </LinkSelected>
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
                  <LinkSelected
                    to={Routes.ITEMS}
                    id={props.itemType1?.id || 0}
                    area='itemType'
                  >
                    {props.itemType1.ItemType}
                  </LinkSelected>,
                  {' '}
                  <LinkSelected
                    to={Routes.ITEMS}
                    id={props.itemType2?.id || 0}
                    area='itemType'
                  >
                    {props.itemType2.ItemType}
                  </LinkSelected>
                </>
                : 'undefined'
            }
          </>
          <div className="centered-button">
            <OptionsCheckbox
              title='Unlocked: '
              available={props.bladeDetails.available}
              unlocked={props.bladeDetails.unlocked}
              onClick={updateBladeUnlocked}
            />
            {
              props.heart2Heart &&
                <OptionsCheckbox
                  title='Heart 2 Heart: '
                  available={props.heart2Heart.Available && props.bladeDetails.unlocked}
                  unlocked={props.heart2Heart?.Viewed}
                  onClick={updateH2HViewed}
                  link={
                    !props.storyProgress.OnlyShowAvailable || props.heart2Heart.Available ?
                      <LinkSelected
                        to={Routes.HEART_2_HEART_LIST}
                        id={props.heart2Heart?.id || 0}
                        area='heart2Heart'
                      >
                        {props.heart2Heart.Title}
                      </LinkSelected>
                      : <div>????</div>
                  }
                />
            }
            {
              props.quest &&
              <OptionsCheckbox
                title='Blade Quest: '
                available={props.quest.Available && props.bladeDetails.unlocked}
                states={[
                  {
                    text: 'NOT STARTED',
                    active: props.quest.Status === 'NOT STARTED'
                  },
                  {
                    text: 'STARTED',
                    imgName: 'Plus',
                    active: props.quest.Status === 'STARTED'
                  },
                  {
                    text: 'FINISHED',
                    imgName: 'Checkmark',
                    active: props.quest.Status === 'FINISHED'
                  }
                ]}
                onClick={updateQuestCompleted}
                link={
                  !props.storyProgress.OnlyShowAvailable || props.quest.Available ?
                    <LinkSelected
                      to={Routes.SIDE_QUEST + props.quest?.id}
                      id={props.quest?.id || 0}
                      area='quest'
                    >
                      {props.quest?.Name}
                    </LinkSelected>
                    : <div>????</div>
                }
              />
            }
          </div>
        </div>
      </div>
    </CollapsibleComponent>
  )
}