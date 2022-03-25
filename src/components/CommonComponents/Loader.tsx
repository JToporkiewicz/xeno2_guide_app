import { useContext } from 'react';
import { LoaderContext } from '../App';

const Loader = () => {
  const loaderState = useContext(LoaderContext).loaderState
  return loaderState.length > 0 ?
    <div className="loading-overlay">
      <div className="loading-background"/>
      <div className="loading-text">
        {loaderState[0]}
      </div>
    </div>
    : <div />
};

export default Loader;