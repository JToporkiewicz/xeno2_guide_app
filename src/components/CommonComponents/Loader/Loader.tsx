import 'scss/loading.scss';

interface IProps {
  loaderState: string[];
}

export const LoaderView = (props: IProps) => {
  return props.loaderState.length > 0 ?
    <div className="loading-overlay">
      <div className="loading-background"/>
      <div className="loading-details">
        <img
          src='/images/helper/Core_Crystal.webp'
          alt='loading'
          className="loading-icon-image"
        />
        <div className="loading-text">
          {props.loaderState[0]}
        </div>
      </div>
    </div>
    : <div />
};

