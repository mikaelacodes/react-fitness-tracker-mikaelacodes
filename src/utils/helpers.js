// helpers.js
// Pure utility functions used across the app for data transformation and
// formatting. Keeping them here (rather than inline) makes them easy to unit
// test and keeps components focused on rendering (DRY principle).

// Ordered days used by the weekly workout planner and day selectors.
export const daysOfWeek = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

// Capitalize the first letter of a string ("strength" -> "Strength").
export const capitalize = (str = '') =>
  str.charAt(0).toUpperCase() + str.slice(1);

// Format a duration in minutes into a friendly label (75 -> "1h 15m").
export const formatDuration = (minutes = 0) => {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
};

// Return an emoji indicator for a difficulty level (used inside JSX).
export const getDifficultyIcon = (difficulty = '') => {
  const icons = { beginner: '🟢', intermediate: '🟡', advanced: '🔴' };
  return icons[difficulty] || '⚪';
};

// Sum the estimated calories burned across a list of exercises.
export const calculateTotalCalories = (exercises = []) =>
  exercises.reduce((total, ex) => total + (ex.caloriesBurn || 0), 0);

// Total the weight moved in a single logged set (sets * reps * weight).
export const calculateTotalWeight = (log = {}) => {
  const { sets = 0, reps = 0, weight = 0 } = log;
  return sets * reps * weight;
};

// Filter exercises by search term, category, muscle group and difficulty.
// Any filter left as 'all' (or an empty search) is ignored.
export const filterExercises = (exercises = [], filters = {}) => {
  const {
    searchTerm = '',
    category = 'all',
    muscleGroup = 'all',
    difficulty = 'all',
  } = filters;
  const term = searchTerm.trim().toLowerCase();

  return exercises.filter((ex) => {
    const matchesTerm = !term || ex.name.toLowerCase().includes(term);
    const matchesCategory = category === 'all' || ex.category === category;
    const matchesMuscle =
      muscleGroup === 'all' || ex.muscleGroups.includes(muscleGroup);
    const matchesDifficulty =
      difficulty === 'all' || ex.difficulty === difficulty;
    return matchesTerm && matchesCategory && matchesMuscle && matchesDifficulty;
  });
};

// Sort exercises by a chosen key. Returns a NEW array (never mutates input).
export const sortExercises = (exercises = [], sortBy = 'name') => {
  const copy = [...exercises];
  switch (sortBy) {
    case 'name':
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    case 'calories':
      return copy.sort((a, b) => b.caloriesBurn - a.caloriesBurn);
    case 'duration':
      return copy.sort((a, b) => a.duration - b.duration);
    default:
      return copy;
  }
};

// Format an ISO date string into a readable label ("2026-09-05" -> "Sep 5, 2026").
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Calculate the current streak of consecutive days that have a logged workout,
// counting backwards from today.
export const calculateStreak = (history = []) => {
  if (history.length === 0) return 0;
  // Unique day strings present in the history (ignores time-of-day).
  const days = new Set(
    history.filter((w) => w.date).map((w) => new Date(w.date).toDateString())
  );
  let streak = 0;
  const cursor = new Date();
  while (days.has(cursor.toDateString())) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
};
