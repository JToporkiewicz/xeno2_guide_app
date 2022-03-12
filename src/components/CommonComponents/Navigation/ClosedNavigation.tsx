interface IProps {
  toggleNavigation:() => any
}

const ClosedNavigation = (props:IProps) => {
  return(
    <img
      className="closed-navigation"
      src="/images/helper/closedMenu.png"
      alt="menu"
      onClick={() => props.toggleNavigation()}
    />
  )
}

export default ClosedNavigation;