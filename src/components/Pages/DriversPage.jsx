import React from 'react';
import CharacterPanelContainer from '../CommonComponents/CharacterPanelsContainer';
import DriverPanel from '../DriverPageComponents/DriverPanel';

function DriversPage(){
    const driversList = [
        <DriverPanel image={null} name="Rex" />,
        <DriverPanel image={null} name="Nia" />,
        <DriverPanel image={null} name="Tora" />,
        <DriverPanel image={null} name="Vandham" />,
        <DriverPanel image={null} name="Morag" />
    ]
    return(
        <div>
            <CharacterPanelContainer title="Drivers">
                {driversList}
            </CharacterPanelContainer>
        </div>
    )
}

export default DriversPage;