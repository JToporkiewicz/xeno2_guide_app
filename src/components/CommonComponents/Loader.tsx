import { useContext } from 'react';
import { LoaderContext } from '../App';

const Loader = () => {
  const loaderContext = useContext(LoaderContext)
  return loaderContext.loaderState.length > 0 ?
    <div className="loading-overlay">
      <div className="loading-background"/>
      <div className="loading-text">
        {loaderContext.loaderState[0]}
      </div>
    </div>
    : <div />
};

export default Loader;