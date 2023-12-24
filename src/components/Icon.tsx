import style from './Icon.module.css';

type Props = {
    name: string;
    size?: number;
    color?: string;
}

const Icon = ({ name , size = 40}: Props) => {
  return (
    <div className={style.icon}>
        <img src={name} alt="icon" width={size} height={size} />    
    </div>
  )
}

export default Icon