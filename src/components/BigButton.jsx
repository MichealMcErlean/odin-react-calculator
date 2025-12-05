import styles from './BigButton.module.css';

export default function BigButton({value, style, onClick}) {
  console.log(style);
  return (
    <button 
      type="button"
      onClick={onClick}
      style={style}
      className={styles.bigbutton}
    >
      {value}
    </button>
  )
}