import HeaderContainer from '../CommonComponents/Containers/HeaderContainer';
import AboutPanel from './AboutPanel';
import { DevelopmentLevel } from './DevelopmentLevel';
import { ProgressStatus } from './ProgressStatus';
import { SettingsForm } from './SettingsForm';

const HomePage = () => {
  return (
    <>
      <HeaderContainer title="Xenoblade Chronicles 2" subtitle="Guide to completion"/>
      <AboutPanel />
      <ProgressStatus />
      <DevelopmentLevel />
      <SettingsForm />
    </>
  );
}

export default HomePage;