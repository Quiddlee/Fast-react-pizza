import { Link } from 'react-router-dom';

const base =
  'rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-yellow-400';

function Button({ children, disabled, to, type }) {
  const isButtonLink = to;

  const styles = {
    primary: `${base} px-4 py-3 md:px-6 md:py-4`,
    small: `${base} px-4 py-2 md:px-5 md:py-2.5 text-xs`,
  };

  if (isButtonLink)
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );

  return (
    <button className={styles[type]} disabled={disabled} type="button">
      {children}
    </button>
  );
}

export default Button;
