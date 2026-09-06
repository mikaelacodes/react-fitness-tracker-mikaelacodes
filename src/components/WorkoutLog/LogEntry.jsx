// LogEntry.jsx
// A single logged-workout row showing the exercise, date and sets/reps/weight,
// plus a computed total weight. Optional onDelete callback removes the entry.

import PropTypes from 'prop-types';
import Card from '../UI/Card';
import Button from '../UI/Button';
import { formatDate, calculateTotalWeight } from '../../utils/helpers';
import styles from './WorkoutLog.module.css';

const LogEntry = ({ workout, onDelete }) => {
  const { id, exerciseName, sets, reps, weight, date } = workout;
  // Function in JSX for data transformation: total volume moved.
  const totalWeight = calculateTotalWeight(workout);

  return (
    <Card className={styles.entry}>
      <div className={styles.entryMain}>
        <span className={styles.entryName}>{exerciseName}</span>
        <span className={styles.entryDate}>{formatDate(date)}</span>
      </div>

      <div className={styles.entryStats}>
        <span className={styles.entryStat}>{sets} sets</span>
        <span className={styles.entryStat}>{reps} reps</span>
        <span className={styles.entryStat}>{weight} lbs</span>
        {/* && conditional: only show total volume when it is meaningful. */}
        {totalWeight > 0 && (
          <span className={styles.entryStat}>{totalWeight} lbs total</span>
        )}
      </div>

      {/* && conditional: render a delete button only if a handler was passed. */}
      {onDelete && (
        <Button variant="danger" onClick={() => onDelete(id)}>
          Delete
        </Button>
      )}
    </Card>
  );
};

LogEntry.propTypes = {
  workout: PropTypes.shape({
    id: PropTypes.number.isRequired,
    exerciseName: PropTypes.string.isRequired,
    sets: PropTypes.number,
    reps: PropTypes.number,
    weight: PropTypes.number,
    date: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func,
};

export default LogEntry;
