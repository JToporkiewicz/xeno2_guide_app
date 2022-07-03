interface IProps {
    id:number,
    updateGameState:any
}
const UnlockOverlay = (props:IProps) => {
  return(
    <div className="overlay">
      <img
        className="centered-image"
        src="/images/helper/openLock.svg"
        alt="unlock"
        onClick={() => props.updateGameState(props.id)}
      />
    </div>
  )
}

export default UnlockOverlay