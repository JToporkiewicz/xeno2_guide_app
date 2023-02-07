import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { IItem, IItemType, IStoryProgress } from 'interfaces'
import { IBladeState, IHeart2HeartState, IQuestState } from 'reduxState/interfaces/reduxState'
import CollapsibleComponent from 'components/CommonComponents/Containers/CollapsibleComponent'
import path from 'path';
import { OptionsCheckbox } from 'components/CommonComponents/FormComponents/OptionsCheckbox';
import { IUpdateH2HStatus } from 'reduxState/interfaces/heart2Hearts'
import { IUpdateQuestStatus } from 'reduxState/interfaces/quest'
import { IUpdateBladeUnlocked } from 'reduxState/interfaces/blades'

interface IOwnProps {
  bladeDetails:IBladeState,
  item1?: IItem | undefined,
  item2?: IItem | undefined,
  itemType1?: IItemType | undefined,
  itemType2?: IItemType | undefined
  heart2Heart?: IHeart2HeartState | undefined,
  quest?: IQuestState | undefined,
  storyProgress: IStoryProgress
}

interface IDispatchProps {
  updateBladeUnlocked: (payload:IBladeState) => void;
  saveBladeStatus: (payload:IUpdateBladeUnlocked) => void;
  updateQuestStatus: (payload:IUpdateQuestStatus) => void;
  saveQuestStatus: (payload:IQuestState) => void;
  updateHeart2HeartStatus: (payload:IUpdateH2HStatus) => void;
  saveHeart2Hearts: (payload:IUpdateH2HStatus[]) => void;
}

export const BladeBasicInfoComponentView = (props: IOwnProps & IDispatchProps) => {
  const bladeToUpdate = useRef(undefined as IBladeState | undefined);
  const questToUpdate = useRef(undefined as IQuestState | undefined);
  const h2hToUpdate = useRef(undefined as IHeart2HeartState | undefined);

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
        questId: props.quest.id,
        status: 'NOT STARTED'
      })
    }
    if(props.heart2Heart) {
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
        props.saveQuestStatus(questToUpdate.current);
      }
      if (h2hToUpdate.current) {
        props.saveHeart2Hearts([{
          id: h2hToUpdate.current.id,
          Viewed: h2hToUpdate.current.Viewed
        }]);
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
                      <Link to={`/heart2Heart/${props.heart2Heart.id}`}>
                        {props.heart2Heart.Title}
                      </Link>
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
                    <Link to={`/quest/${props.quest?.id}`}>
                      {props.quest?.Name}
                    </Link>
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