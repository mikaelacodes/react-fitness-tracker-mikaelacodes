// useLocalStorage.js
// Custom hook that mirrors a piece of state to window.localStorage so data
// (workout plan, workout history) survives page reloads. Returns a [value,
// setValue] pair with the same API as useState, so it is a drop-in replacement.

import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue) => {
  // Lazy initializer: read the stored value once on first render.
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch (error) {
      // If parsing fails (corrupt data), fall back to the initial value.
      return initialValue;
    }
  });

  // Side effect: persist the value whenever it (or the key) changes.
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // Ignore write errors (e.g. storage full or unavailable).
    }
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
