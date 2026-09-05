// Loading.jsx
// Animated spinner shown while data is loading. Uses a default parameter so the
// message is optional.

import PropTypes from 'prop-types';
import styles from './common.module.css';

const Loading = ({ message = 'Loading...' }) => (
  <div className={styles.loading} role="status" aria-live="polite">
    <div className={styles.spinner} />
    <p className={styles.loadingText}>{message}</p>
  </div>
);

Loading.propTypes = {
  message: PropTypes.string,
};

export default Loading;
