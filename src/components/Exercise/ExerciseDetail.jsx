// ExerciseDetail.jsx
// Full detail view for a single exercise, rendered at /exercises/:id. Reads the
// id from the route params, supports Back / Previous / Next programmatic
// navigation, embeds a demo video, and opens a modal form to log a workout.

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Badge from '../UI/Badge';
import Button from '../UI/Button';
import Modal from '../UI/Modal';
import VideoPlayer from '../Media/VideoPlayer';
import { exercisesData } from '../../data/exercisesData';
import {
  capitalize,
  formatDuration,
  getDifficultyIcon,
  daysOfWeek,
} from '../../utils/helpers';
import styles from './Exercise.module.css';

const ExerciseDetail = ({ onAddToPlan, onLogWorkout }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const numericId = parseInt(id, 10);

  // Local UI state.
  const [showModal, setShowModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState('monday');
  // Complex object state for the log form.
  const [log, setLog] = useState({ sets: 0, reps: 0, weight: 0 });

  // Data transformation: find the matching exercise for this route.
  const exercise = exercisesData.find((e) => e.id === numericId);

  // Error / not-found state.
  if (!exercise) {
    return (
      <div className={styles.notFound}>
        <h2>Exercise not found</h2>
        <p>We couldn&apos;t find an exercise with that id.</p>
        <Button onClick={() => navigate('/exercises')}>Back to Exercises</Button>
      </div>
    );
  }

  // Boundaries for Previous / Next navigation.
  const hasPrev = numericId > 1;
  const hasNext = numericId < exercisesData.length;

  // Update one numeric field of the log object (spread to keep the others).
  const handleLogChange = (field) => (e) => {
    setLog({ ...log, [field]: Number(e.target.value) });
  };

  // onSubmit: build a workout record and lift it up to the parent.
  const handleLogSubmit = (e) => {
    e.preventDefault();
    if (onLogWorkout) {
      onLogWorkout({
        id: Date.now(),
        exerciseId: exercise.id,
        exerciseName: exercise.name,
        ...log,
        date: new Date().toISOString(),
      });
    }
    setShowModal(false);
    setLog({ sets: 0, reps: 0, weight: 0 });
  };

  // Add this exercise to the chosen day of the plan (child-to-parent callback).
  const handleAddToPlan = () => {
    if (onAddToPlan) onAddToPlan(selectedDay, exercise);
  };

  return (
    <div className={styles.detail}>
      {/* Programmatic navigation buttons. */}
      <div className={styles.detailNav}>
        <Button variant="secondary" onClick={() => navigate('/exercises')}>
          ← Back
        </Button>
        <Button
          variant="secondary"
          onClick={() => navigate(`/exercises/${numericId - 1}`)}
          disabled={!hasPrev}
        >
          Previous
        </Button>
        <Button
          variant="secondary"
          onClick={() => navigate(`/exercises/${numericId + 1}`)}
          disabled={!hasNext}
        >
          Next
        </Button>
      </div>

      <div className={styles.detailHeader}>
        <h1>{exercise.name}</h1>
        <div className={styles.badges}>
          <Badge variant={exercise.difficulty}>
            {getDifficultyIcon(exercise.difficulty)} {exercise.difficulty}
          </Badge>
          <Badge variant="category">{exercise.category}</Badge>
          {exercise.muscleGroups.map((muscle) => (
            <Badge key={muscle}>{muscle}</Badge>
          ))}
        </div>
      </div>

      <div className={styles.detailGrid}>
        <div>
          <VideoPlayer
            videoUrl={exercise.videoUrl}
            title={`${exercise.name} — Demonstration`}
            description="Watch the proper form before you start."
          />

          <h3>Instructions</h3>
          <ol className={styles.instructions}>
            {/* Map: render each instruction step. */}
            {exercise.instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>

        <div>
          <div className={styles.statRow}>
            <span className={styles.stat}>
              <span className={styles.statLabel}>Duration</span>
              {formatDuration(exercise.duration)}
            </span>
            <span className={styles.stat}>
              <span className={styles.statLabel}>Sets × Reps</span>
              {exercise.sets} × {exercise.reps}
            </span>
            <span className={styles.stat}>
              <span className={styles.statLabel}>Calories</span>
              {exercise.caloriesBurn}
            </span>
            <span className={styles.stat}>
              <span className={styles.statLabel}>Equipment</span>
              {capitalize(exercise.equipment)}
            </span>
          </div>

          <div className={styles.actions}>
            <select
              className={styles.daySelect}
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              aria-label="Day to add to"
            >
              {daysOfWeek.map((day) => (
                <option key={day} value={day}>{capitalize(day)}</option>
              ))}
            </select>
            <Button variant="primary" onClick={handleAddToPlan}>
              Add to Plan
            </Button>
            <Button variant="secondary" onClick={() => setShowModal(true)}>
              Log Workout
            </Button>
          </div>
        </div>
      </div>

      {/* Conditional section: the log-workout modal. */}
      {showModal && (
        <Modal title={`Log: ${exercise.name}`} onClose={() => setShowModal(false)}>
          <form className={styles.logForm} onSubmit={handleLogSubmit}>
            <div className={styles.logField}>
              <label htmlFor="sets">Sets</label>
              <input
                id="sets"
                type="number"
                min="0"
                value={log.sets}
                onChange={handleLogChange('sets')}
              />
            </div>
            <div className={styles.logField}>
              <label htmlFor="reps">Reps</label>
              <input
                id="reps"
                type="number"
                min="0"
                value={log.reps}
                onChange={handleLogChange('reps')}
              />
            </div>
            <div className={styles.logField}>
              <label htmlFor="weight">Weight (lbs)</label>
              <input
                id="weight"
                type="number"
                min="0"
                value={log.weight}
                onChange={handleLogChange('weight')}
              />
            </div>
            <Button type="submit" variant="primary">Save Log</Button>
          </form>
        </Modal>
      )}
    </div>
  );
};

ExerciseDetail.propTypes = {
  onAddToPlan: PropTypes.func,
  onLogWorkout: PropTypes.func,
};

export default ExerciseDetail;
