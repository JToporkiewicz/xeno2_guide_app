import path from 'path';
import 'scss/navigation.scss';
import { LinkSelected } from '../LinkSelected';

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
    { link: '/', title: 'Home', area: '' },
    { link: '/driversList', title: 'Drivers', area: 'driversList' },
    { link: '/bladeList', title: 'Blades', area: 'bladeList' },
    { link: '/sideQuestList', title: 'Side Quests', area: 'sideQuestList' },
    { link: '/heart2HeartList', title: 'Heart 2 Hearts', area: 'heart2HeartList' },
    { link: '/mercMissionList', title: 'Merc Missions', area: 'mercMissionList' },
    { link: '/monsterList', title: 'Monsters', area: 'monsterList' },
    { link: '/items', title: 'Pouch', area: 'items' }
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