import { Link } from 'react-router-dom';
import { ISelectedState } from 'reduxState/interfaces/reduxState';

interface IDispatchProps {
  setSelected: (payload: ISelectedState) => void;
}

interface IOwnProps {
  to: string;
  children: any;
  area: string;
  id: number;
  className?: string;
  key?: string;
}

export const LinkSelectedView = (props: IDispatchProps & IOwnProps) => {
  return <Link
    to={props.to}
    onClick={() => props.setSelected({
      id: props.id,
      area: props.area
    })}
    className={props.className}
    key={props.key}
  >
    {props.children}
  </Link>
}