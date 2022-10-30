import HeaderContainer from '../CommonComponents/Containers/HeaderContainer'
import { Heart2HeartList } from './Heart2HeartList'

export const Heart2HeartsListPage = () => {
  return (
    <>
      <HeaderContainer title='Heart2Hearts'/>
      <Heart2HeartList parentPage='heart2HeartList'/>
    </>
  )
};
