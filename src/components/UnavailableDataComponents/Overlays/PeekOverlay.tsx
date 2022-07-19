import path from 'path';

interface IProps {
    id:number,
    updateGameState:any
}
const PeekOverlay = (props:IProps) => {
  return(
    <div className="overlay">
      <img
        className="centered-image peek-unlock-button"
        src={path.resolve('images/helper/peek.png')}
        alt="lock"
        onClick={() => props.updateGameState(props.id)}
      />
    </div>
  )
}

export default PeekOverlay