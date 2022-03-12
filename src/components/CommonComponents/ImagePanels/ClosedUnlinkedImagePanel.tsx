import ContentsOfImagePanel from './ContentsOfImagePanel';

interface IProps {
  focused:boolean,
  focus:(value:string) => any,
  name:string,
  panelType:string
}

const ClosedUnlinkedImagePanel = (props:IProps) => {
  return (
    <div className="col-sm-3 stretched-sibling-panels">
      <ContentsOfImagePanel {...props} />
    </div>
  )
};

export default ClosedUnlinkedImagePanel;