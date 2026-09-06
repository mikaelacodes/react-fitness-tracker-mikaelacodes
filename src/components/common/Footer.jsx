// Footer.jsx
// App footer with the current year computed at render time.

import styles from './common.module.css';

const Footer = () => (
  <footer className={styles.footer}>
    {/* Function called in JSX: current year. */}
    <p>© {new Date().getFullYear()} FitTrack — Stay strong, stay consistent. 💪</p>
  </footer>
);

export default Footer;
