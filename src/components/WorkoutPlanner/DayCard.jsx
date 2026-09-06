// DayCard.jsx
// Represents one day of the weekly plan (reused 7 times). Lists the exercises
// assigned to the day and exposes remove / clear / view callbacks to the parent.

import PropTypes from 'prop-types';
import Card from '../UI/Card';
import Button from '../UI/Button';
import { capitalize } from '../../utils/helpers';
import styles from './WorkoutPlanner.module.css';

const DayCard = ({ day, exercises = [], onRemove, onClear, onViewDay }) => {
  const hasExercises = exercises.length > 0;

  return (
    <Card className={styles.dayCard}>
      <div className={styles.dayHeader}>
        <h3 className={styles.dayTitle}>{capitalize(day)}</h3>
        <span className={styles.count}>{exercises.length}</span>
      </div>

      {/* Ternary: show the exercise list, or an empty message. */}
      {hasExercises ? (
        <ul className={styles.exerciseList}>
          {exercises.map((exercise) => (
            <li key={exercise.id} className={styles.exerciseItem}>
              <span>{exercise.name}</span>
              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => onRemove(day, exercise.id)}
                aria-label={`Remove ${exercise.name}`}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.empty}>No exercises yet.</p>
      )}

      <div className={styles.dayActions}>
        {/* && conditional: only offer a detail view when a handler is provided. */}
        {onViewDay && (
          <Button variant="secondary" onClick={() => onViewDay(day)}>
            View
          </Button>
        )}
        {/* && conditional: only show Clear when the day has exercises. */}
        {hasExercises && (
          <Button variant="danger" onClick={() => onClear(day)}>
            Clear
          </Button>
        )}
      </div>
    </Card>
  );
};

DayCard.propTypes = {
  day: PropTypes.string.isRequired,
  exercises: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  onRemove: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  onViewDay: PropTypes.func,
};

export default DayCard;
