import {useState} from 'react';
import HomePage from './HomePageComponents/HomePage';
import DriversListPage from './DriverListPageComponents/DriversListPage';
import { Route, Switch } from 'react-router-dom';
import Navigation from './CommonComponents/Navigation/Navigation';
import DriverDetailsPage from './DriverDetailsPageComponent/DriverDetailsPage';
import Default from './Default';

const App = () => {
  const [openNavigation, setNavigation] = useState(false);

  const toggleNavigation = () => {
    setNavigation(!openNavigation)
  }

  return(
    <div className="container-fluid flex-grow-1">
      <div className="row background">
        <Navigation
          toggleNavigation={toggleNavigation.bind(this)}
          openNavigation={openNavigation}
        />
        <div className={openNavigation ? 'part-page' : 'full-page'}>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/driverslist" component={DriversListPage} />
            <Route path="/driver/:slug" component={DriverDetailsPage} />
            <Route component={Default} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;