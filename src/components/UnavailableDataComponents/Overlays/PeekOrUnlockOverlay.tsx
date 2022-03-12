interface IProps {
    id:number,
    name:string,
    toggleShow:(name:string) => void,
    updateState:(id:number) => void
}

const PeekOrUnlockOverlay = (props:IProps) => {
  return(
    <div className="overlay">
      <img
        className="peek-unlock-button"
        src="/images/helper/peek.png"
        alt="peek"
        onClick={() => props.toggleShow(props.name)}
      />
      <img
        className="peek-unlock-button"
        src="/images/helper/openLock.png"
        alt="unlock"
        onClick={() => props.updateState(props.id)}
      />
    </div>
  )
}

export default PeekOrUnlockOverlay