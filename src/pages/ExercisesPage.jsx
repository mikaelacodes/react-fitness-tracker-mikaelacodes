// ExercisesPage.jsx
// Browse page: owns the search/filter/sort state locally, loads the exercises
// (async, with a loading state) and passes filtered data + callbacks down to
// the SearchBar, ExerciseFilter and ExerciseList children.

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchBar from '../components/UI/SearchBar';
import ExerciseFilter from '../components/Exercise/ExerciseFilter';
import ExerciseList from '../components/Exercise/ExerciseList';
import { exercisesData } from '../data/exercisesData';
import { filterExercises, sortExercises } from '../utils/helpers';
import styles from './Pages.module.css';

const ExercisesPage = ({ onAddToPlan, planExerciseIds = [] }) => {
  const navigate = useNavigate();

  // Data + loading state.
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter/sort state (page owns it, children lift changes up).
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [muscleGroup, setMuscleGroup] = useState('all');
  const [difficulty, setDifficulty] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Async load on mount: show the loading state briefly, then populate.
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setExercises(exercisesData);
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Data transformation before passing to the child: filter, then sort.
  const visibleExercises = sortExercises(
    filterExercises(exercises, { searchTerm, category, muscleGroup, difficulty }),
    sortBy
  );

  // Reset every filter back to its default.
  const handleReset = () => {
    setSearchTerm('');
    setCategory('all');
    setMuscleGroup('all');
    setDifficulty('all');
    setSortBy('name');
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>Browse Exercises</h1>
      <p className={styles.pageIntro}>
        Find the right movement, then add it to your weekly plan.
      </p>

      <div className={styles.toolbar}>
        <SearchBar
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
          onClear={() => setSearchTerm('')}
        />
      </div>

      <ExerciseFilter
        category={category}
        muscleGroup={muscleGroup}
        difficulty={difficulty}
        sortBy={sortBy}
        onCategoryChange={setCategory}
        onMuscleChange={setMuscleGroup}
        onDifficultyChange={setDifficulty}
        onSortChange={setSortBy}
        onReset={handleReset}
      />

      {/* && conditional: only show a count once loading has finished. */}
      {!isLoading && (
        <p className={styles.resultsCount}>
          {visibleExercises.length} exercise
          {visibleExercises.length === 1 ? '' : 's'} found
        </p>
      )}

      <ExerciseList
        exercises={visibleExercises}
        isLoading={isLoading}
        onAdd={onAddToPlan}
        onView={(id) => navigate(`/exercises/${id}`)}
        planExerciseIds={planExerciseIds}
      />
    </div>
  );
};

ExercisesPage.propTypes = {
  onAddToPlan: PropTypes.func.isRequired,
  planExerciseIds: PropTypes.arrayOf(PropTypes.number),
};

export default ExercisesPage;
