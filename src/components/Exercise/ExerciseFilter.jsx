// ExerciseFilter.jsx
// Presentational filter bar. Every control lifts its change up to the parent
// (ExercisesPage) via callback props, so the parent owns the filter state.

import PropTypes from 'prop-types';
import Button from '../UI/Button';
import { capitalize } from '../../utils/helpers';
import { CATEGORIES, DIFFICULTIES, MUSCLE_GROUPS } from '../../data/exercisesData';
import styles from './Exercise.module.css';

const ExerciseFilter = ({
  category = 'all',
  muscleGroup = 'all',
  difficulty = 'all',
  sortBy = 'name',
  onCategoryChange,
  onMuscleChange,
  onDifficultyChange,
  onSortChange,
  onReset,
}) => (
  <div className={styles.filter}>
    <div className={styles.filterGroup}>
      <label className={styles.label} htmlFor="category">Category</label>
      <select
        id="category"
        className={styles.select}
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="all">All Categories</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>{capitalize(c)}</option>
        ))}
      </select>
    </div>

    <div className={styles.filterGroup}>
      <label className={styles.label} htmlFor="muscle">Muscle Group</label>
      <select
        id="muscle"
        className={styles.select}
        value={muscleGroup}
        onChange={(e) => onMuscleChange(e.target.value)}
      >
        <option value="all">All Muscles</option>
        {MUSCLE_GROUPS.map((m) => (
          <option key={m} value={m}>{capitalize(m)}</option>
        ))}
      </select>
    </div>

    <div className={styles.filterGroup}>
      <label className={styles.label} htmlFor="difficulty">Difficulty</label>
      <select
        id="difficulty"
        className={styles.select}
        value={difficulty}
        onChange={(e) => onDifficultyChange(e.target.value)}
      >
        <option value="all">All Levels</option>
        {DIFFICULTIES.map((d) => (
          <option key={d} value={d}>{capitalize(d)}</option>
        ))}
      </select>
    </div>

    <div className={styles.filterGroup}>
      <label className={styles.label} htmlFor="sort">Sort By</label>
      <select
        id="sort"
        className={styles.select}
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="name">Name (A–Z)</option>
        <option value="calories">Calories (high–low)</option>
        <option value="duration">Duration (short–long)</option>
      </select>
    </div>

    <Button variant="secondary" onClick={onReset}>Clear Filters</Button>
  </div>
);

ExerciseFilter.propTypes = {
  category: PropTypes.string,
  muscleGroup: PropTypes.string,
  difficulty: PropTypes.string,
  sortBy: PropTypes.string,
  onCategoryChange: PropTypes.func.isRequired,
  onMuscleChange: PropTypes.func.isRequired,
  onDifficultyChange: PropTypes.func.isRequired,
  onSortChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default ExerciseFilter;
