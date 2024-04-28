import HeaderContainer from 'components/CommonComponents/Containers/HeaderContainer'
import { IStoryProgress } from 'interfaces'
import { IMajorLocations, IUpdateUnlocked } from 'reduxState/interfaces/reduxState'
import { LocationsList } from './LocationsList'
import { useEffect, useRef } from 'react'
import { IUpdateLocationMapped } from 'reduxState/interfaces/locations'

interface IDispatchProps {
  fetchAllMinorLocations: () => void,
  updateMappedLocation: (payload: IUpdateLocationMapped) => void,
  saveMappedLocations: (payload: IUpdateUnlocked) => void
}

interface IProps {
  majorAreas: IMajorLocations[],
  storyProgress: IStoryProgress
}

export const LocationsPageView = (props: IProps & IDispatchProps) => {
  const toUpdate = useRef([] as IUpdateLocationMapped[]);

  useEffect(() => {
    return () => {
      if (toUpdate.current.length) {
        props.saveMappedLocations({
          unlocked: toUpdate.current.filter((loc) => loc.mapped).map((loc) => loc.locId),
          locked: toUpdate.current.filter((loc) => !loc.mapped).map((loc) => loc.locId)
        })
      }
    }
  }, [])

  const updateLocMapped = (
    majorAreaId: number,
    innerAreaId: number,
    locId: number,
    mapped: boolean
  ) => {
    const updatePayload = {
      majorArea: majorAreaId,
      innerArea: innerAreaId,
      locId,
      mapped
    }
    props.updateMappedLocation(updatePayload);

    toUpdate.current = toUpdate.current
      .filter((updateLoc) => updateLoc.locId !== locId)
      .concat(updatePayload)
  }

  return (
    <>
      <HeaderContainer title='Locations' refreshData={props.fetchAllMinorLocations} />
      {props.majorAreas.map((ma) =>
        <LocationsList
          title={ma.Name}
          innerAreas={ma.InnerMajorAreas}
          storyProgress={props.storyProgress}
          updateLocation={updateLocMapped.bind(this, ma.id)}
          key={ma.Name}
        />
      )}
    </>    
  )
}