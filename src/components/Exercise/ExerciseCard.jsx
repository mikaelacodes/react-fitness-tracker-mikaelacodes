// ExerciseCard.jsx
// Summary card for a single exercise. Receives the exercise object plus two
// callback props (onAdd, onView) so it can talk back to its parent
// (child-to-parent communication). Holds its own selected-day state.

import { useState } from 'react';
import PropTypes from 'prop-types';
import Card from '../UI/Card';
import Badge from '../UI/Badge';
import Button from '../UI/Button';
import { capitalize, formatDuration, getDifficultyIcon, daysOfWeek } from '../../utils/helpers';
import styles from './Exercise.module.css';

const ExerciseCard = ({ exercise, isInPlan = false, onAdd, onView }) => {
  // Local state: which day this exercise will be added to.
  const [selectedDay, setSelectedDay] = useState('monday');

  // Destructure the fields we need from the exercise object.
  const { id, name, category, muscleGroups, difficulty, duration, caloriesBurn } = exercise;

  return (
    <Card hoverable>
      <div className={styles.cardHeader}>
        <h3 className={styles.title}>{name}</h3>
        {/* Expression as prop: difficulty drives the badge colour. */}
        <Badge variant={difficulty}>
          {getDifficultyIcon(difficulty)} {difficulty}
        </Badge>
      </div>

      <div className={styles.badges}>
        <Badge variant="category">{category}</Badge>
        {/* Map: render one badge per muscle group. */}
        {muscleGroups.map((muscle) => (
          <Badge key={muscle}>{muscle}</Badge>
        ))}
      </div>

      {/* Functions called in JSX for data transformation. */}
      <p className={styles.meta}>
        {formatDuration(duration)} · {caloriesBurn} cal
      </p>

      <div className={styles.actions}>
        {/* onChange handler updates local day state. */}
        <select
          className={styles.daySelect}
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
          aria-label={`Day for ${name}`}
        >
          {daysOfWeek.map((day) => (
            <option key={day} value={day}>
              {capitalize(day)}
            </option>
          ))}
        </select>

        {/* onClick calls the parent callback with the chosen day + exercise. */}
        <Button
          variant="primary"
          onClick={() => onAdd(selectedDay, exercise)}
          disabled={isInPlan}
        >
          {/* Ternary for conditional label. */}
          {isInPlan ? 'In Plan ✓' : 'Add'}
        </Button>

        <Button variant="secondary" onClick={() => onView(id)}>
          View
        </Button>
      </div>
    </Card>
  );
};

// PropTypes validation with a nested shape for the exercise object.
ExerciseCard.propTypes = {
  exercise: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    muscleGroups: PropTypes.arrayOf(PropTypes.string),
    difficulty: PropTypes.string,
    duration: PropTypes.number,
    caloriesBurn: PropTypes.number,
  }).isRequired,
  isInPlan: PropTypes.bool,
  onAdd: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired,
};

export default ExerciseCard;
