interface IProps {
    id:number,
    updateGameState:(id:number) => void
}
const UnlockOverlay = (props:IProps) => {
  return(
    <div className="overlay">
      <img
        className="centered-image"
        src="/images/helper/openLock.png"
        alt="unlock"
        onClick={() => props.updateGameState(props.id)}
      />
    </div>
  )
}

export default UnlockOverlay