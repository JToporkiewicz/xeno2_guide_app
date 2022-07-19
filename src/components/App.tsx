import { useState } from 'react';
import HomePage from './HomePageComponents/HomePage';
import { DriversListPage } from './DriverListPage';
import { Route, Switch } from 'react-router-dom';
import { Navigation } from './CommonComponents/Navigation';
import { DriverDetailsPage } from './DriverDetailsPageComponent/DriverDetailsPage';
import Default from './Default';
import { Loader } from './CommonComponents/Loader';
import { Heart2HeartsListPage } from './Heart2HeartsPage/Heart2HeartsListPage';
import { BladeListPage } from './BladeListPage';
import { BladeDetailsPage } from './BladeDetailsPageComponent/BladeDetailsPage';
import {
  Heart2HeartDetailsPage
} from './Heart2HeartDetailsPageComponent/Heart2HeartDetailsPage';

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
            <Route path="/bladeList" component={BladeListPage} />
            <Route path="/blade/:slug" component={BladeDetailsPage} />
            <Route path="/heart2HeartList" component={Heart2HeartsListPage} />
            <Route path="/heart2heart/:slug" component={Heart2HeartDetailsPage} />
            <Route component={Default} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;