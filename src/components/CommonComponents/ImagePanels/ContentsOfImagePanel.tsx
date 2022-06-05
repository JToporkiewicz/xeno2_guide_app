interface IProps {
  name:string,
  panelType:string,
  focused?:boolean,
  focus?:(value:string) => any,
  progress?:number,
  unlocked?:boolean
}

const ContentsOfImagePanel = (props:IProps) => {
  return (
    <div 
      className={`image-panel${props.focused ? ' focused-panel' : ''}${
        props.unlocked === false ? ' not-unlocked-character' : ''}`}
      onClick={() => props.focus ? props.focus(props.name) : {}}>
      <img
        src={`/images/${props.panelType}/${props.name.replace(/\s+/g, '')}.jpeg`}
        alt={props.name}
        className={props.panelType === 'weaponType' ? 'weapon-class-image' : 'character-image'}/>
      <div className="image-name">{props.name}</div>
      {props.progress ?
        <div className="greyBar">
          <div
            className="obtained"
            style={{
              width: props.progress + '%'
            }}
          />
          <p>{props.progress}%</p>
        </div>
        : undefined
      }
    </div>
  )
};

export default ContentsOfImagePanel;