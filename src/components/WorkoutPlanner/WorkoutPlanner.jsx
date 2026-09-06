// WorkoutPlanner.jsx
// Container that renders the seven DayCards from the shared workoutPlan object.
// State lives in App and is passed down here (props); changes flow back up via
// the onRemove / onClear callbacks.

import PropTypes from 'prop-types';
import DayCard from './DayCard';
import { daysOfWeek } from '../../utils/helpers';
import styles from './WorkoutPlanner.module.css';

const WorkoutPlanner = ({ workoutPlan, onRemove, onClear, onViewDay }) => (
  <div className={styles.planner}>
    {/* Map the ordered days to a reusable DayCard each. */}
    {daysOfWeek.map((day) => (
      <DayCard
        key={day}
        day={day}
        exercises={workoutPlan[day] || []}
        onRemove={onRemove}
        onClear={onClear}
        onViewDay={onViewDay}
      />
    ))}
  </div>
);

WorkoutPlanner.propTypes = {
  workoutPlan: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  onViewDay: PropTypes.func,
};

export default WorkoutPlanner;
