import styles from './Button.module.css';

export default function Button({value, onClick}) {

  function valueToText() {
    let text;
    switch(value) {
      case 'sqr':
        text = <span>x&sup2;</span>;
        break;
      case 'sqrt':
        text = <span>&radic;x</span>;
        break;
      case 'inv':
        text = <span>x<sup>-1</sup></span>;
        break;
      case 'exp':
        text = <span>x<sup>y</sup></span>;
        break;
      case '/':
        text = <span>&divide;</span>;
        break;
      case '*':
        text = <span>&times;</span>;
      default:
        text = value
    }
    return text;
  }

  return (
    <button 
      type="button"
      value={value}
      onClick={onClick}
      className={styles.button}
    >
      {valueToText()}
    </button>
  )
}