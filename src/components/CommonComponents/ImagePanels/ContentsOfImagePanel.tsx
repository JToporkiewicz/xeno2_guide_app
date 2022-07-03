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
      className={`image-panel${props.focused ? ' focused-panel' : ''}`}
      onClick={() => props.focus ? props.focus(props.name) : {}}>
      <img
        src={`/images/${props.panelType}/${props.name.replace(/\s+/g, '')}.jpeg`}
        alt={props.name}
        className={`${props.panelType === 'weaponType' ? 'weapon-class-image' : 'character-image'}${
          props.unlocked === false ? ' not-unlocked-character' : ''}`}/>
      <div className="image-name">{props.name}</div>
      {props.progress != undefined && props.progress !== null ?
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