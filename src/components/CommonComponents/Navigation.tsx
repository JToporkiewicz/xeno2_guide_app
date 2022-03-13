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

interface IProps {
  toggleNavigation:()=>void,
  openNavigation:boolean
}

const Navigation = (props:IProps) => {
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
            <OpenNavigationButton link={button.link} title={button.title} />
            : <ClosedNavigationButton link={button.link} title={button.title} />
        )}
      </div>
    </div>
  );
}

export default Navigation;