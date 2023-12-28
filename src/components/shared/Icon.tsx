import { shortcut } from '../../assets/asset';
import style from './Icon.module.css';
import Tooltip from './Tooltip';

type Props = {
  icon: string;
  size?: number;
  color?: string;
  title?: string;
  tooltip?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  isShortcut?: boolean;
}

const Icon = ({ icon: name, size = 40, title, isShortcut = false, tooltip, onClick
}: Props) => {
  return (
    <Tooltip title={tooltip ?? ''}>
      <div className={`${style.icon} ${title ? style.ico : style.nav}`} onClick={onClick}>
        <div className={style.iconWrapper}>
          <img src={name} alt="icon" width={size} height={size} />
          {(isShortcut) && <img className={style.shortcut} src={shortcut} alt="icon" width={15} height={15} />}
        </div>
        {Boolean(title) && <span>{title}</span>}
      </div>
    </Tooltip>
  )
}

export default Icon