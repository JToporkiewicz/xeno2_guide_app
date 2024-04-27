import path from 'path'

export const TopScroll = () => {
  return (
    <div
      className='top-scroll'
      onClick={() => window.scroll({ top: 0, behavior: 'smooth'})}
    >
      <img
        src={path.resolve('images/helper/Up.svg')}
        className='top-scroll-icon'
      />
    </div>
  )
}