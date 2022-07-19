import { ISelectedState } from 'reduxState/interfaces/reduxState';
import ContentsOfImagePanel from '../ContentsOfImagePanel';

interface IOwnProps {
  id:number,
  name:string,
  panelType:string,
  focused?:boolean,
  focus?:(value:string) => any,
  selectCharacter:() => any,
  progress?:number,
  unlocked?:boolean
}

interface IProps {
  setSelected: (payload:ISelectedState) => void;
}

export const ClosedLinkedImagePanelView = (props:IProps & IOwnProps) => {
  return (
    <div
      className="col-sm-3 stretched-sibling-panels"
      onClick={() => {
        props.setSelected({id: props.id, area: props.panelType})
        props.selectCharacter()
      }}
    >
      <div className="titled-image-name">
        <ContentsOfImagePanel {...props} />
      </div>
    </div>
  )
};
