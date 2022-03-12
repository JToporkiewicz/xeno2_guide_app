import { Link } from 'react-router-dom';

interface IButtonProps {
  link:string,
  title:string
}

const NavigationButton = (props:IButtonProps) => {

  return (
    <>
      <Link to={props.link} className="navigation-button">
        {props.title}
      </Link>
      <hr/>
    </>
  )
}

interface IProps {
  toggleNavigation:() => void
}

const Navigation = (props:IProps) => {
  return (
    <div className="col-md-2 open-navigation">
      <h5 onClick={() => props.toggleNavigation()}>
        Collapse
      </h5>
      <hr />
      <NavigationButton link="/" title="Home"/>
      <NavigationButton link="/driversList" title="Drivers"/>
    </div>
  );
}

export default Navigation;