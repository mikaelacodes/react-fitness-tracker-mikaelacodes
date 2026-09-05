// ExerciseList.jsx
// Renders a grid of ExerciseCards. Handles the three data states required by
// the rubric: loading, error and empty — before falling back to the list.

import PropTypes from 'prop-types';
import ExerciseCard from './ExerciseCard';
import Loading from '../common/Loading';
import styles from './Exercise.module.css';

const ExerciseList = ({
  exercises = [],
  isLoading = false,
  error = '',
  onAdd,
  onView,
  planExerciseIds = [],
}) => {
  // Loading state (early return).
  if (isLoading) {
    return <Loading message="Loading exercises..." />;
  }

  // Error state (early return).
  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  // Empty state (early return).
  if (exercises.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No exercises found</p>
        <span>Try adjusting your search or filters.</span>
      </div>
    );
  }

  // Normal state: map the exercises to cards.
  return (
    <div className={styles.grid}>
      {exercises.map((exercise) => (
        <ExerciseCard
          key={exercise.id}
          exercise={exercise}
          // Expression as prop: is this exercise already in the plan?
          isInPlan={planExerciseIds.includes(exercise.id)}
          onAdd={onAdd}
          onView={onView}
        />
      ))}
    </div>
  );
};

ExerciseList.propTypes = {
  exercises: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  onAdd: PropTypes.func,
  onView: PropTypes.func,
  planExerciseIds: PropTypes.arrayOf(PropTypes.number),
};

export default ExerciseList;
