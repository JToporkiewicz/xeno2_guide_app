import {createContext, useState} from 'react';
import HomePage from './HomePageComponents/HomePage';
import DriversListPage from './DriverListPageComponents/DriversListPage';
import { Route, Switch } from 'react-router-dom';
import Navigation from './CommonComponents/Navigation';
import DriverDetailsPage from './DriverDetailsPageComponent/DriverDetailsPage';
import Default from './Default';
import Loader from './CommonComponents/Loader';
import Heart2HeartsPage from './Heart2HeartsPage/Heart2HeartsPage';
import { defaultStoryProgress, IStoryProgress } from '../interfaces';

export interface ILoaderContext {
  loaderState:string[],
  setLoader: (_:string[]) => void
}

export const LoaderContext = createContext({
  loaderState: [] as string[],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setLoader: (_:string[]) => {}
});

export interface IStoryContext {
  progressState:IStoryProgress,
  setProgress: (_:IStoryProgress) => void
}

export const ProgressContext = createContext({
  progressState: defaultStoryProgress,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setProgress: (_:IStoryProgress) => {}
});

const App = () => {
  const [openNavigation, setNavigation] = useState(false);
  const [loaderState, setLoader] = useState([] as string[]);
  const [progressState, setProgress] = useState(defaultStoryProgress);

  const toggleNavigation = () => {
    setNavigation(!openNavigation)
  }

  return(
    <LoaderContext.Provider value={{loaderState, setLoader}}>
      <ProgressContext.Provider value={{progressState, setProgress}}>
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
      </ProgressContext.Provider>
    </LoaderContext.Provider>
  );
}

export default App;