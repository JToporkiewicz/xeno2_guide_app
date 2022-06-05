interface IProps {
  loaderState: string[];
}

export const LoaderView = (props: IProps) => {
  return props.loaderState.length > 0 ?
    <div className="loading-overlay">
      <div className="loading-background"/>
      <div className="loading-text">
        {props.loaderState[0]}
      </div>
    </div>
    : <div />
};
