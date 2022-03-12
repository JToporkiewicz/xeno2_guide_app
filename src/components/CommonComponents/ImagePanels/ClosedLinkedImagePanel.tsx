import { Link } from 'react-router-dom';
import ContentsOfImagePanel from './ContentsOfImagePanel';

interface IProps {
  id:number,
  name:string,
  panelType:string,
  focused?:boolean,
  focus?:(value:string) => any,
}

const ClosedLinkedImagePanel = (props:IProps) => {
  return (
    <div className="col-sm-3 stretched-sibling-panels">
      <Link to={`/${props.panelType}/${props.id}`} className="titled-image-name">
        <ContentsOfImagePanel {...props} />
      </Link>
    </div>
  )
};

export default ClosedLinkedImagePanel;