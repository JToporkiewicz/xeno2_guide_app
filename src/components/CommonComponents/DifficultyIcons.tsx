import { isNaN } from 'lodash';
import path from 'path';

export const DifficultyIcons = (props: {difficulty: string, id: string}) => {
  let difficultyNumber = Number(props.difficulty);
  if (isNaN(difficultyNumber)) {
    return <p>Special battle</p>
  }

  const icons = [];

  let i: number = 0;
  while (i < 5) {
    i++;
    if (difficultyNumber > 1) {
      icons.push(
        <img
          src={path.resolve('images/helper/difficulty1.png')}
          alt='difficulty1'
          className='difficulty-small-image'
          key={props.id + ' icon ' + i}
        />
      )
      difficultyNumber = difficultyNumber - 1
    } else if (difficultyNumber > 0.5) {
      icons.push(
        <img
          src={path.resolve('images/helper/difficultyHalf.png')}
          alt='difficulty0.5'
          className='difficulty-small-image'
          key={props.id + ' icon ' + i}
        />
      )
      difficultyNumber = difficultyNumber - 0.5
    } else {
      icons.push(
        <img
          src={path.resolve('images/helper/difficulty0.png')}
          alt='difficulty0'
          className='difficulty-small-image'
          key={props.id + ' icon ' + i}
        />
      )    
    }
  }
  return <div className='row difficulty-icons'>{icons.map((ic) => ic)}</div>
}