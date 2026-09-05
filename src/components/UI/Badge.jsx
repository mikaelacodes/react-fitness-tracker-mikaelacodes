// Badge.jsx
// Small pill used for difficulty and muscle-group indicators. `variant` maps to
// a colour scheme (e.g. difficulty levels) and defaults to a neutral style.

import PropTypes from 'prop-types';
import styles from './UI.module.css';

const Badge = ({ children, variant = 'default' }) => {
  // Look up the variant class dynamically, falling back to the default style.
  const variantClass = styles[`badge_${variant}`] || styles.badge_default;
  return <span className={`${styles.badge} ${variantClass}`}>{children}</span>;
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.string,
};

export default Badge;
