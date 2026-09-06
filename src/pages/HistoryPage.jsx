// HistoryPage.jsx
// Displays the logged workout history (or an empty state) via WorkoutLog.

import PropTypes from 'prop-types';
import WorkoutLog from '../components/WorkoutLog/WorkoutLog';
import styles from './Pages.module.css';

const HistoryPage = ({ workoutHistory = [], onDelete }) => (
  <div className={styles.page}>
    <h1 className={styles.pageTitle}>Workout History</h1>
    <p className={styles.pageIntro}>
      {/* Ternary in JSX for a dynamic subtitle. */}
      {workoutHistory.length > 0
        ? `You've logged ${workoutHistory.length} workout${
            workoutHistory.length === 1 ? '' : 's'
          }.`
        : 'Log a workout from any exercise to see it here.'}
    </p>

    <WorkoutLog history={workoutHistory} onDelete={onDelete} />
  </div>
);

HistoryPage.propTypes = {
  workoutHistory: PropTypes.arrayOf(PropTypes.object),
  onDelete: PropTypes.func,
};

export default HistoryPage;
