import HeaderContainer from '../CommonComponents/Containers/HeaderContainer';
import AboutPanel from './AboutPanel';
import { ProgressStatus } from './ProgressStatus';
import { SettingsForm } from './SettingsForm';

const HomePage = () => {
  return (
    <>
      <HeaderContainer title="Xenoblade Chronicles 2" subtitle="Guide to completion"/>
      <AboutPanel />
      <ProgressStatus />
      <SettingsForm />
    </>
  );
}

export default HomePage;