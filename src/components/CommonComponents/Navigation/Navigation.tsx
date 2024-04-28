import path from 'path';
import 'scss/navigation.scss';
import { LinkSelected } from '../LinkSelected';
import { Routes } from 'helpers/routesConst';

interface IButtonProps {
  link:string,
  title:string,
  area: string
}

const OpenNavigationButton = (props:IButtonProps) => {

  return (
    <div>
      <LinkSelected
        to={props.link}
        area={props.area}
        id={0}
        className="navigation-button"
      >
        <img
          src={path.resolve(`images/helper/${props.title.replaceAll(' ', '')}.svg`)}
          className="navigation-image"
        />
        <span className="navigation-button-text">
          {props.title}
        </span>
      </LinkSelected>
      <hr className="navigation-button-separator"/>
    </div>
  )
}

const ClosedNavigationButton = (props:IButtonProps) => {
  return (
    <div>
      <LinkSelected
        to={props.link}
        area={props.area}
        id={0}
        className="navigation-button"
      >
        <img
          src={path.resolve(`images/helper/${props.title.replaceAll(' ', '')}.svg`)}
          className="navigation-image"
        />
      </LinkSelected>
      <hr className="navigation-button-separator"/>
    </div>
  )
}

interface IDispatchProps {
  resetState:() => void
}

interface IOwnProps {
  toggleNavigation:()=>void,
  openNavigation:boolean
}

export const NavigationView = (props:IOwnProps & IDispatchProps) => {
  const navigationButtons = [
    { link: Routes.HOME, title: 'Home', area: '' },
    { link: Routes.LOCATIONS, title: 'Locations', area: 'locations'},
    { link: Routes.DRIVER_LIST, title: 'Drivers', area: 'driversList' },
    { link: Routes.BLADE_LIST, title: 'Blades', area: 'bladeList' },
    { link: Routes.SIDE_QUEST_LIST, title: 'Side Quests', area: 'sideQuestList' },
    { link: Routes.HEART_2_HEART_LIST, title: 'Heart 2 Hearts', area: 'heart2HeartList' },
    { link: Routes.MERC_MISSION_LIST, title: 'Merc Missions', area: 'mercMissionList' },
    { link: Routes.MONSTER_LIST, title: 'Monsters', area: 'monsterList' },
    { link: Routes.ITEMS, title: 'Pouch', area: 'items' },
    { link: Routes.CHALLENGE_BATTLES, title: 'Challenge Battles', area: 'challengeBattles' }
  ]
  return (
    <div className={props.openNavigation ? 'open-navigation' : 'closed-navigation'}>
      <div className="sticky-navigation">
        <div
          onClick={() => props.toggleNavigation()}
        >
          <img
            src={path.resolve(`images/helper/${props.openNavigation ? 'Left' : 'Right'}.svg`)}
            onClick={() => props.toggleNavigation()}
            className="navigation-toggle"
          />        
          <hr className="navigation-button-separator"/>
        </div>

        {navigationButtons.map((button:IButtonProps) =>
          props.openNavigation ?
            <OpenNavigationButton {...button} key={button.title}/>
            : <ClosedNavigationButton {...button} key={button.title}/>
        )}
        <div className="navigation-buttom">
          <div
            onClick={() => props.resetState()}
          >
            <img
              src={path.resolve('images/helper/reset.svg')}
              className="navigation-image"
            />
            {props.openNavigation &&
              <span className="navigation-button-text">
                Reset
              </span>        
            }

          </div>
        </div>
      </div>
    </div>
  );
};