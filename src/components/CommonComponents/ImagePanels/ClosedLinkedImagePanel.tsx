import ContentsOfImagePanel from './ContentsOfImagePanel';

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

export const ClosedLinkedImagePanel = (props:IOwnProps) => {
  return (
    <div
      className="col-sm-3 stretched-sibling-panels"
      onClick={() => props.selectCharacter()}
    >
      <div className="titled-image-name">
        <ContentsOfImagePanel {...props} />
      </div>
    </div>
  )
};
