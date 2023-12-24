import style from './Icon.module.css';

type Props = {
  icon: string;
  size?: number;
  color?: string;
  title?: string;
}

const Icon = ({ icon: name, size = 40, title }: Props) => {
  return (
    <div className={style.icon}>
      <img src={name} alt="icon" width={size} height={size} />
      <span>{title}</span>
    </div>
  )
}

export default Icon