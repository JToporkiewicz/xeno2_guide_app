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
      className="character-image-panel"
      onClick={() => props.selectCharacter()}
    >
      <ContentsOfImagePanel {...props} />
    </div>
  )
};
