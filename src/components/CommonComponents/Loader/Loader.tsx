import 'scss/loading.scss';
import path from 'path';

interface IProps {
  loaderState: string[];
  saving: string[];
}

export const LoaderView = (props: IProps) => {
  if (props.loaderState.length > 0) {
    return (
      <div className="loading-overlay">
        <div className="loading-background"/>
        <div className="loading-details">
          <img
            src={path.resolve('images/helper/Core_Crystal.webp')}
            alt='loading'
            className="loading-icon-image"
          />
          <div className="loading-text">
            {props.loaderState[0]}
          </div>
        </div>
      </div>
    )
  }

  return props.saving.length > 0 ?
    <div className="small-loader">
      <img
        src={path.resolve('images/helper/Core_Crystal.webp')}
        alt='loading'
        className="loading-icon-image"
      />
      <div className="loading-text">{props.saving[0]}</div>
    </div>
    : <div />
};

