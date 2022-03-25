import CollapsibleComponent from '../CommonComponents/Containers/CollapsibleComponent'

interface IProps {
  driverId: number,
  hiddenTree?:boolean
}

const DriverSkillsComponent = (props:IProps) => {
  return (
    <CollapsibleComponent header={props.hiddenTree ?
      'Driver Hidden Skills'
      : 'Driver Skills'}>

    </CollapsibleComponent>
  )
};

export default DriverSkillsComponent;