import CollapsibleComponent from '../CommonComponents/Containers/CollapsibleComponent';

const AboutPanel = () => {
  return (
    <CollapsibleComponent header="About">
      <>
        Welcome to the Xenoblade 2 guide application! <br />
        This application is aimed at helping completionists find information
        about unlockable elements in the game Xenoblade Chronicles 2.<br />
        Using this application, you can also track the progress and monitor it easily.<br />
        The information tracked in this application includes: 
        <ul>
          <li>ways of unlocking specific blades</li>
          <li>blade affinity trees progress</li>
          <li>side quests steps</li>
          <li>heart-to-hearts prerequisites and outcomes</li>
          <li>driver skill trees progress</li>
          <li>unique monsters</li>
        </ul>
            Currently, the application does not include information about:
        <ul>
          <li>equipment sources</li>
          <li>interactive spots</li>
          <li>treasure chests</li>
          <li>non-unique blades</li>
        </ul>
            Information used in this application is obtained from:
        <ul>
          <li><a href="https://xenoblade.fandom.com/wiki/Xenoblade_Chronicles_2">
            Xenoblade 2 Fandom Wiki</a></li>
          <li>
            <a href="https://docs.google.com/spreadsheets/d
              /1EG0UpsgjhISr6_isiUpiWMU9qcXj6t8wWB0_LAiH1yE
              /edit?fbclid=IwAR3TemckeBvK0vfS1vGr3NgjnT5cx7
              t7CkYVpZA4FPsWaQhNDDUu1sqN86k#gid=970837341"
            >
              fan created Xenoblade Chronicles 2 Info Sheet
            </a>
          </li>
          <li>personal observations and experiences playing the game</li>
        </ul>
      </>
    </CollapsibleComponent>
  )
};

export default AboutPanel;