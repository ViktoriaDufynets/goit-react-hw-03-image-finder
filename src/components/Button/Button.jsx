import css from './Button.module.css';

function Button({ onNextFetch }) {
    return (
      <button className={css.Button} type="button" onClick={onNextFetch}>
        Load more
      </button>
    );
  }
  
  export default Button;