// Card.jsx
// Generic container that renders whatever is passed as `children` (composition
// pattern). `hoverable` adds a lift-on-hover effect via conditional class.

import PropTypes from 'prop-types';
import styles from './UI.module.css';

const Card = ({ children, className = '', hoverable = false }) => {
  // Conditional styling: only apply the hover class when requested.
  const classes = `${styles.card} ${hoverable ? styles.cardHoverable : ''} ${className}`.trim();
  return <div className={classes}>{children}</div>;
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  hoverable: PropTypes.bool,
};

export default Card;
