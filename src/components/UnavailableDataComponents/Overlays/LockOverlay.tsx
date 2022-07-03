interface IProps {
    id:number,
    updateGameState:any
}
const LockOverlay = (props:IProps) => {
  return(
    <div className="overlay">
      <img
        className="centered-image"
        src="/images/helper/closedLock.svg"
        alt="lock"
        onClick={() => props.updateGameState(props.id)}
      />
    </div>
  )
}

export default LockOverlay