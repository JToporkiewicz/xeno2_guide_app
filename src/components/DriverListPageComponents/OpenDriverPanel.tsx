import { Link } from 'react-router-dom';

interface IProps {
    id:number,
    name:string
}

const OpenDriverPanel = (props:IProps) => {
  return (
    <div className="col-sm-3">
      <div className="titled-image-panel">
        <img src={`images/driver/${props.name}.jpeg`} alt={props.name} className="character-image"/>
        <Link to={`/driver/${props.id}`} className="titled-image-name">
          {props.name}
        </Link>
      </div>
    </div>
  )
};

OpenDriverPanel.defaultProps = {
  name: 'N/A',
  id: 0
};

export default OpenDriverPanel;