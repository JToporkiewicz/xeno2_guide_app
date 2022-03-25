import HeaderContainer from '../CommonComponents/Containers/HeaderContainer'
import Heart2HeartList from './Heart2HeartList'

const Heart2HeartsPage = () => {
  return (
    <>
      <HeaderContainer title='Heart2Hearts'/>
      <Heart2HeartList parentPage='heart2HeartList'/>
    </>
  )
};

export default Heart2HeartsPage;