// App.jsx
// Root component. Owns the shared application state (weekly plan + workout
// history, both persisted to localStorage), defines the handlers that mutate
// it, and wires up all routes. State is lifted here so the Exercises, Planner,
// History and Progress pages act as siblings sharing one source of truth.

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navigation/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import ExercisesPage from './pages/ExercisesPage';
import ExerciseDetail from './components/Exercise/ExerciseDetail';
import WorkoutPlannerPage from './pages/WorkoutPlannerPage';
import HistoryPage from './pages/HistoryPage';
import ProgressPage from './pages/ProgressPage';
import NotFound from './pages/NotFound';
import useLocalStorage from './hooks/useLocalStorage';
import { daysOfWeek } from './utils/helpers';
import './App.css';

// Starting shape for an empty weekly plan (one array per day).
const EMPTY_PLAN = {
  monday: [],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: [],
  saturday: [],
  sunday: [],
};

function App() {
  // Shared, persisted state via the custom hook (two localStorage features).
  const [workoutPlan, setWorkoutPlan] = useLocalStorage('workoutPlan', EMPTY_PLAN);
  const [workoutHistory, setWorkoutHistory] = useLocalStorage('workoutHistory', []);

  // Add an exercise to a day, skipping duplicates already on that day.
  const handleAddToPlan = (day, exercise) => {
    setWorkoutPlan((prev) => {
      if (prev[day].some((e) => e.id === exercise.id)) return prev;
      return { ...prev, [day]: [...prev[day], exercise] };
    });
  };

  // Remove one exercise from a day.
  const handleRemoveFromPlan = (day, exerciseId) => {
    setWorkoutPlan((prev) => ({
      ...prev,
      [day]: prev[day].filter((e) => e.id !== exerciseId),
    }));
  };

  // Clear an entire day.
  const handleClearDay = (day) => {
    setWorkoutPlan((prev) => ({ ...prev, [day]: [] }));
  };

  // Prepend a newly logged workout to the history.
  const handleLogWorkout = (workout) => {
    setWorkoutHistory((prev) => [workout, ...prev]);
  };

  // Delete a workout from the history.
  const handleDeleteLog = (id) => {
    setWorkoutHistory((prev) => prev.filter((w) => w.id !== id));
  };

  // Flatten all planned exercise ids (data transformation passed to children).
  const planExerciseIds = daysOfWeek.flatMap((day) =>
    (workoutPlan[day] || []).map((e) => e.id)
  );

  return (
    <BrowserRouter>
      <div className="appShell">
        <Navbar />
        <main className="appMain">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/exercises"
              element={
                <ExercisesPage
                  onAddToPlan={handleAddToPlan}
                  planExerciseIds={planExerciseIds}
                />
              }
            />
            <Route
              path="/exercises/:id"
              element={
                <ExerciseDetail
                  onAddToPlan={handleAddToPlan}
                  onLogWorkout={handleLogWorkout}
                />
              }
            />
            <Route
              path="/workout-planner"
              element={
                <WorkoutPlannerPage
                  workoutPlan={workoutPlan}
                  onRemove={handleRemoveFromPlan}
                  onClear={handleClearDay}
                />
              }
            />
            <Route
              path="/workout-planner/:day"
              element={
                <WorkoutPlannerPage
                  workoutPlan={workoutPlan}
                  onRemove={handleRemoveFromPlan}
                  onClear={handleClearDay}
                />
              }
            />
            <Route
              path="/history"
              element={
                <HistoryPage
                  workoutHistory={workoutHistory}
                  onDelete={handleDeleteLog}
                />
              }
            />
            <Route
              path="/progress"
              element={
                <ProgressPage
                  workoutPlan={workoutPlan}
                  workoutHistory={workoutHistory}
                />
              }
            />
            {/* Catch-all 404 route. */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
