// Button.jsx
// Reusable button with primary / secondary / danger variants. Uses default
// parameters (React 19 ignores defaultProps on function components) and applies
// the variant through conditional class selection.

import PropTypes from 'prop-types';
import styles from './UI.module.css';

const Button = ({
  variant = 'primary',
  type = 'button',
  onClick,
  disabled = false,
  children,
  className = '',
}) => {
  // Conditional styling: combine the base class with the chosen variant class.
  const classes = `${styles.button} ${styles[variant] || styles.primary} ${className}`.trim();

  return (
    // eslint-disable-next-line react/button-has-type
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Button;
