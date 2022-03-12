interface IProps {
    id:number,
    updateGameState:(story:number) => void
}
const LockOverlay = (props:IProps) => {
  return(
    <div className="overlay">
      <img
        className="centered-image"
        src="/images/helper/closedLock.png"
        alt="lock"
        onClick={() => props.updateGameState(props.id)}
      />
    </div>
  )
}

export default LockOverlay