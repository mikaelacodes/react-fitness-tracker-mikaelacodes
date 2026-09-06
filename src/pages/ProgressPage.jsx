// ProgressPage.jsx
// Summary stats (workouts, planned exercises, calories, streak) plus a bar
// chart of exercises planned per weekday. Reads the shared plan + history.

import PropTypes from 'prop-types';
import Card from '../components/UI/Card';
import ProgressChart from '../components/WorkoutLog/ProgressChart';
import {
  daysOfWeek,
  capitalize,
  calculateStreak,
  calculateTotalCalories,
} from '../utils/helpers';
import styles from './Pages.module.css';

const ProgressPage = ({ workoutPlan, workoutHistory = [] }) => {
  // Flatten every exercise currently in the plan (data transformation).
  const plannedExercises = daysOfWeek.flatMap((day) => workoutPlan[day] || []);

  // Derived stat values.
  const totalWorkouts = workoutHistory.length;
  const totalPlanned = plannedExercises.length;
  const totalCalories = calculateTotalCalories(plannedExercises);
  const streak = calculateStreak(workoutHistory);

  // Chart data: number of exercises planned on each weekday.
  const chartData = daysOfWeek.map((day) => ({
    label: capitalize(day).slice(0, 3),
    value: workoutPlan[day] ? workoutPlan[day].length : 0,
  }));

  // Stat tiles rendered via map (DRY) with inline-styled accent values.
  const stats = [
    { label: 'Workouts Logged', value: totalWorkouts },
    { label: 'Exercises Planned', value: totalPlanned },
    { label: 'Planned Calories', value: totalCalories },
    { label: 'Day Streak', value: streak },
  ];

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>Your Progress</h1>
      <p className={styles.pageIntro}>A quick snapshot of your fitness journey.</p>

      <div className={styles.statGrid}>
        {stats.map((stat) => (
          <Card key={stat.label}>
            {/* Inline style: accent colour driven by whether there is data. */}
            <div
              className={styles.statValue}
              style={{ color: stat.value > 0 ? 'var(--color-primary)' : 'var(--color-muted)' }}
            >
              {stat.value}
            </div>
            <div className={styles.statLabel}>{stat.label}</div>
          </Card>
        ))}
      </div>

      <ProgressChart title="Exercises planned per day" data={chartData} />
    </div>
  );
};

ProgressPage.propTypes = {
  workoutPlan: PropTypes.object.isRequired,
  workoutHistory: PropTypes.arrayOf(PropTypes.object),
};

export default ProgressPage;
