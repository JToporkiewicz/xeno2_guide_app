import { useState } from 'react';
import HomePage from './HomePageComponents/HomePage';
import { DriversListPage } from './DriverListPageComponents/DriversListPage';
import { Route, Switch } from 'react-router-dom';
import Navigation from './CommonComponents/Navigation';
import { DriverDetailsPage } from './DriverDetailsPageComponent/DriverDetailsPage';
import Default from './Default';
import { Loader } from './CommonComponents/Loader';
import Heart2HeartsPage from './Heart2HeartsPage/Heart2HeartsPage';

const App = () => {
  const [openNavigation, setNavigation] = useState(false);

  const toggleNavigation = () => {
    setNavigation(!openNavigation)
  }

  return(
    <div className="container-fluid flex-grow-1">
      <div className="row background">
        <Loader />
        <Navigation
          toggleNavigation={toggleNavigation.bind(this)}
          openNavigation={openNavigation}
        />
        <div className={openNavigation ? 'part-page' : 'full-page'}>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/driverslist" component={DriversListPage} />
            <Route path="/driver/:slug" component={DriverDetailsPage} />
            <Route path="/heart2HeartList" component={Heart2HeartsPage} />
            <Route component={Default} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;