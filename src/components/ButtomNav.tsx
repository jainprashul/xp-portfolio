import style from './BottomNav.module.css';
import Icon from './Icon';
import { calender, info, mail, project, winMenu } from '../assets/asset';

const BottomNav = () => {
  return (
    <div className={style.bg}>
      <Icon name={winMenu} size={40} />
      <Icon name={project} size={40} />
      <Icon name={mail} size={40} />
      <Icon name={calender} size={40} />
      <Icon name={info} size={40} />
      </div>
  )
}

export default BottomNav