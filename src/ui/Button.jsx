import { Link } from 'react-router-dom';

const base =
  'rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-yellow-400 text-sm';

function Button({ children, disabled, to, type }) {
  const isButtonLink = to;

  const styles = {
    primary: `${base} px-4 py-3 md:px-6 md:py-4`,
    small: `${base} px-4 py-2 md:px-5 md:py-2.5 text-xs`,
    secondary:
      'rounded-full text-sm border-2 border-stone-300 font-semibold uppercase tracking-wide text-stone-400 transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 focus:text-stone-800 focus:bg-stone-300 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-yellow-400 px-4 py-2.5 md:px-6 md:py-3.5',
  };

  if (isButtonLink)
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );

  return (
    <button className={styles[type]} disabled={disabled} type="submit">
      {children}
    </button>
  );
}

export default Button;