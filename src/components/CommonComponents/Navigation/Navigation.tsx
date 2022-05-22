import { Link } from 'react-router-dom';

interface IButtonProps {
  link:string,
  title:string
}

const OpenNavigationButton = (props:IButtonProps) => {

  return (
    <div>
      <Link to={props.link} className="navigation-button">
        <img
          src={`/images/helper/${props.title.replaceAll(' ', '')}.svg`}
          className="navigation-image"
        />
        <span className="navigation-button-text">
          {props.title}
        </span>
      </Link>
      <hr className="navigation-button-separator"/>
    </div>
  )
}

const ClosedNavigationButton = (props:IButtonProps) => {
  return (
    <div>
      <Link to={props.link} className="navigation-button">
        <img
          src={`/images/helper/${props.title.replaceAll(' ', '')}.svg`}
          className="navigation-image"
        />
      </Link>
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
    { link: '/', title: 'Home' },
    { link: '/driversList', title: 'Drivers' },
    { link: '/bladeList', title: 'Blades' },
    { link: '/heart2HeartList', title: 'Heart 2 Hearts' },
    { link: '/sideQuestList', title: 'Side Quests' },
    { link: '/mercMissionList', title: 'Merc Missions' },
  ]
  return (
    <div className={props.openNavigation ? 'open-navigation' : 'closed-navigation'}>
      <div className="sticky-navigation">
        <div
          onClick={() => props.toggleNavigation()}
        >
          <img
            src={`/images/helper/${props.openNavigation ? 'Left' : 'Right'}.svg`}
            onClick={() => props.toggleNavigation()}
            className="navigation-toggle"
          />        
          <hr className="navigation-button-separator"/>
        </div>

        {navigationButtons.map((button:{link:string, title:string}) =>
          props.openNavigation ?
            <OpenNavigationButton link={button.link} title={button.title} key={button.title}/>
            : <ClosedNavigationButton link={button.link} title={button.title} key={button.title}/>
        )}
        <div className="navigation-buttom">
          <img
            src='/images/helper/reset.svg'
            onClick={() => props.resetState()}
            className="navigation-image"
          />
        </div>
      </div>
    </div>
  );
};