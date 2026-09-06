// Navbar.jsx
// Sticky navigation bar. Uses NavLink so the active route is styled
// automatically, and a hamburger toggle (local state) for mobile screens.

import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

// Route definitions mapped to links (kept in one place — DRY).
const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/exercises', label: 'Exercises' },
  { to: '/workout-planner', label: 'Planner' },
  { to: '/history', label: 'History' },
  { to: '/progress', label: 'Progress' },
];

const Navbar = () => {
  // Local state: whether the mobile menu is open.
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((open) => !open);
  const closeMenu = () => setMenuOpen(false);

  // Conditional styling: add the "open" class when the mobile menu is showing.
  const listClass = `${styles.navLinks} ${menuOpen ? styles.open : ''}`;

  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.brand} onClick={closeMenu} end>
        💪 FitTrack
      </NavLink>

      <button
        type="button"
        className={styles.hamburger}
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
      >
        <span />
        <span />
        <span />
      </button>

      <ul className={listClass}>
        {NAV_LINKS.map((link) => (
          <li key={link.to}>
            {/* NavLink sets an "isActive" flag we use for active styling. */}
            <NavLink
              to={link.to}
              end={link.end}
              onClick={closeMenu}
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ''}`
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
