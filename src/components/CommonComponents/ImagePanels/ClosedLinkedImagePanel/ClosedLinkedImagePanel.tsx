import { Link } from 'react-router-dom';
import { ISelectedState } from '../../../../redux/interfaces/reduxState';
import ContentsOfImagePanel from '../ContentsOfImagePanel';

interface IOwnProps {
  id:number,
  name:string,
  panelType:string,
  focused?:boolean,
  focus?:(value:string) => any,
}

interface IProps {
  setSelected: (payload:ISelectedState) => void;
}

export const ClosedLinkedImagePanelView = (props:IProps & IOwnProps) => {
  return (
    <div
      className="col-sm-3 stretched-sibling-panels"
      onClick={() => props.setSelected({id: props.id, area: props.panelType})}
    >
      <Link to={`/${props.panelType}/${props.id}`} className="titled-image-name">
        <ContentsOfImagePanel {...props} />
      </Link>
    </div>
  )
};
