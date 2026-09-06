// WorkoutPlannerPage.jsx
// Shows the weekly planner. When a :day route param is present it renders a
// focused single-day view (second dynamic route); otherwise all seven days.

import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import WorkoutPlanner from '../components/WorkoutPlanner/WorkoutPlanner';
import DayCard from '../components/WorkoutPlanner/DayCard';
import Button from '../components/UI/Button';
import { daysOfWeek, capitalize } from '../utils/helpers';
import styles from './Pages.module.css';
import plannerStyles from '../components/WorkoutPlanner/WorkoutPlanner.module.css';

const WorkoutPlannerPage = ({ workoutPlan, onRemove, onClear }) => {
  const { day } = useParams();
  const navigate = useNavigate();

  // Navigate to a single day's focused view (uses the :day param route).
  const handleViewDay = (targetDay) => navigate(`/workout-planner/${targetDay}`);

  // Total exercises planned across the week (data transformation in JSX).
  const totalPlanned = daysOfWeek.reduce(
    (sum, d) => sum + (workoutPlan[d] ? workoutPlan[d].length : 0),
    0
  );

  // Focused single-day view when the route has a valid :day param.
  if (day && daysOfWeek.includes(day)) {
    return (
      <div className={styles.page}>
        <Button
          className={plannerStyles.backLink}
          variant="secondary"
          onClick={() => navigate('/workout-planner')}
        >
          ← All days
        </Button>
        <h1 className={styles.pageTitle}>{capitalize(day)} Workout</h1>
        <div className={plannerStyles.focused}>
          <DayCard
            day={day}
            exercises={workoutPlan[day] || []}
            onRemove={onRemove}
            onClear={onClear}
          />
        </div>
      </div>
    );
  }

  // Full weekly view.
  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>Weekly Workout Planner</h1>
      <p className={styles.pageIntro}>
        {/* Ternary: encourage the user or show their planned total. */}
        {totalPlanned === 0
          ? 'Your plan is empty — add exercises from the Exercises page.'
          : `${totalPlanned} exercise${totalPlanned === 1 ? '' : 's'} planned this week.`}
      </p>

      <WorkoutPlanner
        workoutPlan={workoutPlan}
        onRemove={onRemove}
        onClear={onClear}
        onViewDay={handleViewDay}
      />
    </div>
  );
};

WorkoutPlannerPage.propTypes = {
  workoutPlan: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

export default WorkoutPlannerPage;
