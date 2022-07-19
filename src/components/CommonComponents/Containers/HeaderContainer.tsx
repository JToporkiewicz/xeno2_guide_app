import path from 'path';

interface IProps {
  title:string,
  subtitle?:string,
  refreshData?:(id?:any) => void,
  refreshDataId?:any
}

const HeaderContainer = (props:IProps) =>
  <div className="header">
    <div>
      <h1>{props.title}</h1>
      {
        props.refreshData !== undefined ?
          <img
            src={path.resolve('images/helper/reset.svg')}
            className="refresh-image"
            onClick={() => props.refreshData && (props.refreshDataId ?
              props.refreshData(props.refreshDataId)
              : props.refreshData())
            }
          />
          : undefined
      }
    </div>
    {props.subtitle !== '' ? 
      <h3>{props.subtitle}</h3>
      : <div />}
  </div>

HeaderContainer.defaultProps = {
  subtitle: ''
}

export default HeaderContainer;