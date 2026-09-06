// Header.jsx
// Page banner with a title, optional subtitle and optional children (e.g. a
// call-to-action). Demonstrates the children composition pattern.

import PropTypes from 'prop-types';
import styles from './common.module.css';

const Header = ({ title, subtitle = '', children }) => (
  <header className={styles.header}>
    <h1 className={styles.headerTitle}>{title}</h1>
    {/* && conditional: subtitle is optional. */}
    {subtitle && <p className={styles.headerSubtitle}>{subtitle}</p>}
    {/* Children composition: render anything the caller nests inside. */}
    {children}
  </header>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  children: PropTypes.node,
};

export default Header;
