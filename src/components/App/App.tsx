import { useEffect, useState } from 'react';
import HomePage from '../HomePage';
import { DriversListPage } from '../DriverListPage';
import { Route, Switch, useLocation } from 'react-router-dom';
import { Navigation } from '../CommonComponents/Navigation';
import { DriverDetailsPage } from '../DriverDetailsPage';
import Default from '../Default';
import { Loader } from '../CommonComponents/Loader';
import { Heart2HeartsListPage } from '../Heart2HeartsPage';
import { BladeListPage } from '../BladeListPage';
import { BladeDetailsPage } from '../BladeDetailsPage';
import { ISelectedState } from 'reduxState/interfaces/reduxState';
import { SideQuestPage } from 'components/SideQuestsPage';
import {
  SideQuestDetailsPage
} from 'components/SideQuestDetailsPage';
import { MercMissionListPage } from 'components/MercMissionListPage';
import { MonsterListPage } from 'components/MonsterListPage';
import { ItemListPage } from 'components/ItemListPage';
import { Routes } from 'helpers/routesConst';
import { ChallengeBattleListPage } from 'components/ChallengeBattleListPage';
import { TopScroll } from 'components/CommonComponents/TopScroll';
import { LocationsPage } from 'components/LocationsPage';

interface IDispatchProps {
  setSelected:(payload:ISelectedState) => void;
}

interface IProps {
  selected:ISelectedState;
}

export const AppView = (props:IProps & IDispatchProps) => {
  const [openNavigation, setNavigation] = useState(false);

  const toggleNavigation = () => {
    setNavigation(!openNavigation)
  }

  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname.split('/');
    if (pathname.length > 2) {
      props.setSelected({
        area: pathname[1],
        id: Number(pathname[2] || 0)
      })      
    }

    window.scroll({
      top: 0,
      behavior: 'smooth'
    })

  }, [location])


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
            <Route path={Routes.HOME} exact component={HomePage} />
            <Route path={Routes.DRIVER_LIST} component={DriversListPage} />
            <Route path={`${Routes.DRIVER}:slug`} component={DriverDetailsPage} />
            <Route path={Routes.BLADE_LIST} component={BladeListPage} />
            <Route path={`${Routes.BLADE}:slug`} component={BladeDetailsPage} />
            <Route path={Routes.HEART_2_HEART_LIST} component={Heart2HeartsListPage} />
            <Route path={Routes.SIDE_QUEST_LIST} component={SideQuestPage} />
            <Route path={`${Routes.SIDE_QUEST}:slug`} component={SideQuestDetailsPage} />
            <Route path={Routes.MERC_MISSION_LIST} component={MercMissionListPage} />
            <Route path={Routes.MONSTER_LIST} component={MonsterListPage} />
            <Route path={Routes.ITEMS} component={ItemListPage} />
            <Route path={Routes.CHALLENGE_BATTLES} component={ChallengeBattleListPage} />
            <Route path={Routes.LOCATIONS} component={LocationsPage} />
            <Route component={Default} />
          </Switch>
          <TopScroll />
        </div>
      </div>
    </div>
  );
}
