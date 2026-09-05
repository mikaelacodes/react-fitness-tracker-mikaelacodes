# Fitness Tracker & Workout Planner — Planning Document

## Component Hierarchy Diagram

```
App  (owns shared state + routing)
├── Navbar ─ Link × 5 (active styling via NavLink)
├── Routes
│   ├── "/"                Home
│   │     ├── Header
│   │     ├── AudioPlayer            (motivational track)
│   │     └── Card > Button          (call-to-action)
│   ├── "/exercises"       ExercisesPage
│   │     ├── SearchBar
│   │     ├── ExerciseFilter         (category / muscle / difficulty / sort)
│   │     └── ExerciseList
│   │           └── ExerciseCard (map)
│   │                 ├── Badge
│   │                 └── Button
│   ├── "/exercises/:id"   ExerciseDetail   ← param route #1
│   │     ├── VideoPlayer
│   │     ├── Badge (map muscleGroups)
│   │     └── Modal > log form
│   ├── "/workout-planner"       WorkoutPlanner
│   │     └── DayCard × 7 (map)  > Button
│   ├── "/workout-planner/:day"  DayCard detail  ← param route #2
│   ├── "/history"         WorkoutLog > LogEntry (map)
│   ├── "/progress"        ProgressPage > ProgressChart + Card
│   └── "*"                NotFound
└── Footer
```

Deepest path (≥3 levels): `App > ExercisesPage > ExerciseList > ExerciseCard > Badge`.

## Component List (28 functional, 0 class)

- **UI (reusable):** Button, Card, Badge, SearchBar, Loading, Modal
- **common:** Header, Footer
- **Navigation:** Navbar
- **Media:** VideoPlayer, AudioPlayer
- **Exercise:** ExerciseCard, ExerciseList, ExerciseDetail, ExerciseFilter
- **Planner:** WorkoutPlanner, DayCard
- **Log:** WorkoutLog, LogEntry, ProgressChart
- **Pages:** Home, ExercisesPage, WorkoutPlannerPage, HistoryPage, ProgressPage, NotFound

## Props Flow (main components)

- `ExerciseCard` ← `exercise`, `onAdd`, `onSelect`, `isInPlan` (PropTypes)
- `DayCard` ← `day`, `exercises`, `onRemove`, `onClear` (PropTypes)
- `Button` ← `variant`, `onClick`, `children` (default param + PropTypes)
- `Card` / `Modal` ← `children` (composition)
- `VideoPlayer` / `AudioPlayer` ← `url`, `title`, `description`

Expressions as props: filtered list, computed calories, dynamic inline style, ternary flags.

## State Management Strategy

Shared state is **lifted to `App.jsx`**:
- `workoutPlan` — object keyed by day, persisted via `useLocalStorage`
- `workoutHistory` — array of logged workouts, persisted via `useLocalStorage`

Callbacks (`onAddToPlan`, `onRemove`, `onLogWorkout`) flow down; updates flow up. Exercises page and Planner/History pages act as **siblings communicating through App**.

Page-local state: `searchTerm`, `category`, `muscleGroup`, `difficulty`, `sortBy`, `isLoading`, `selectedExercise`, `showModal`, and log-form fields (`sets/reps/weight`).

`useEffect` (4): load exercises on mount; simulated async load flag; plus two persistence writes handled inside `useLocalStorage`.

## Data Flow

Down: exercise data + handlers + styling props. Up: `ExerciseCard → onAddToPlan(day, exercise)`. Sibling: add on Exercises re-renders Planner/Progress from App state. Transform-before-pass: filtered/sorted list, formatted duration, computed streak/calories.

## Testing Strategy

- **Component:** Button, Badge, ExerciseCard, SearchBar, DayCard (render/props/click).
- **Conditional:** ExerciseList loading / empty / error.
- **Interaction:** search typing, filter change, log-form submit.
- **Integration:** add-to-plan flow; cross-route navigation.
- **Routing:** nav link → page; unknown URL → 404.
- **Hooks:** `useLocalStorage` initial + update; async `useEffect` load (`waitFor`).
- **Mocks:** `jest.fn()` for onClick/onAdd/onSubmit. Target **>70% line & branch** coverage.
