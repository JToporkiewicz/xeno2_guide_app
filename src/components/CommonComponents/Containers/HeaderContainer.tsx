import path from 'path';
import { LinkSelected } from '../LinkSelected';

export interface IHeaderNavigation {
  area: string,
  previousLink?: string,
  nextLink?: string,
  previousTitle?: string,
  previousId?: number,
  nextId?: number,
  nextTitle?: string
}

interface IProps {
  title:string,
  subtitle?:string,
  refreshData?:(id?:any) => void,
  refreshDataId?:any,
  navigation?: IHeaderNavigation
}

const HeaderContainer = (props:IProps) =>
  <div className="header">
    <div className="header-main">
      <div className='header-navigation previous'>
        {
          props.navigation
          && props.navigation.previousId !== undefined
          && props.navigation.previousLink !== undefined ?
            <LinkSelected
              to={props.navigation.previousLink}
              area={props.navigation.area}
              id={props.navigation.previousId}
            >
              <img
                src={path.resolve('images/helper/Left.svg')}
                className='previous-button'
              />
              {props.navigation.previousTitle ?
                <span className="header-navigation-text">
                  {props.navigation.previousTitle}
                </span>
                : undefined}
            </LinkSelected>
            : undefined
        }
      </div>
      <h1>{props.title}</h1>
      <div className='header-navigation next'>
        {
          props.navigation
          && props.navigation.nextId !== undefined
          && props.navigation.nextLink !== undefined ?
            <LinkSelected
              to={props.navigation.nextLink}
              area={props.navigation.area}
              id={props.navigation.nextId}
            >
              {props.navigation.nextTitle ?
                <span className="header-navigation-text">
                  {props.navigation.nextTitle}
                </span>
                : undefined}

              <img
                src={path.resolve('images/helper/Right.svg')}
                className='next-button'
              />
            </LinkSelected>
            : undefined
        }
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
    </div>
    {props.subtitle !== '' ? 
      <h3>{props.subtitle}</h3>
      : <div />}
  </div>

HeaderContainer.defaultProps = {
  subtitle: ''
}

export default HeaderContainer;