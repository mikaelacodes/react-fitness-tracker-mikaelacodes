// WorkoutLog.jsx
// Renders the workout history as a list of LogEntry rows, or an empty state
// when nothing has been logged yet.

import PropTypes from 'prop-types';
import LogEntry from './LogEntry';
import styles from './WorkoutLog.module.css';

const WorkoutLog = ({ history = [], onDelete }) => {
  // Empty state (conditional whole-section render).
  if (history.length === 0) {
    return (
      <div className={styles.empty}>
        No workouts logged yet. Start tracking your progress!
      </div>
    );
  }

  return (
    <div className={styles.log}>
      {/* Map each history record to a LogEntry. */}
      {history.map((workout) => (
        <LogEntry key={workout.id} workout={workout} onDelete={onDelete} />
      ))}
    </div>
  );
};

WorkoutLog.propTypes = {
  history: PropTypes.arrayOf(PropTypes.object),
  onDelete: PropTypes.func,
};

export default WorkoutLog;
