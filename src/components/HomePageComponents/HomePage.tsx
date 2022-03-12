import HeaderContainer from '../CommonComponents/Containers/HeaderContainer';
import AboutPanel from './AboutPanel';
import SettingsForm from './SettingsForm';

const HomePage = () => {
  return (
    <>
      <HeaderContainer title="Xenoblade Chronicles 2" subtitle="Guide to completion"/>
      <AboutPanel />
      <SettingsForm />
    </>
  );
}

export default HomePage;