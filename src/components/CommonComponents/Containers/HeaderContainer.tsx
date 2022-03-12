interface IProps {
  title:string,
  subtitle?:string
}

const HeaderContainer = (props:IProps) =>
  <div className="header collapsible-container">
    <h1>{props.title}</h1>
    {props.subtitle !== '' ? 
      <h3>{props.subtitle}</h3>
      : <div />}
  </div>

HeaderContainer.defaultProps = {
  subtitle: ''
}

export default HeaderContainer;