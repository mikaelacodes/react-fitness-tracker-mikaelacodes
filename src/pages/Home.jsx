// Home.jsx
// Landing page: a hero header with call-to-action buttons, a motivational audio
// track, and a grid of feature cards.

import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import AudioPlayer from '../components/Media/AudioPlayer';
import styles from './Pages.module.css';

// Feature highlights rendered via map (kept as data — DRY).
const FEATURES = [
  { icon: '🏋️', title: 'Browse Exercises', text: 'Search and filter 24+ exercises by category, muscle and difficulty.' },
  { icon: '📅', title: 'Plan Your Week', text: 'Build a Monday–Sunday plan and it saves automatically.' },
  { icon: '📝', title: 'Log Workouts', text: 'Record sets, reps and weight to track every session.' },
  { icon: '📈', title: 'See Progress', text: 'Visualise your streak, calories and weekly volume.' },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <Header
          title="Welcome to FitTrack 💪"
          subtitle="Plan smarter. Train harder. Track everything."
        >
          {/* Children composition: CTA buttons nested inside the Header. */}
          <div className={styles.heroActions}>
            <Button variant="primary" onClick={() => navigate('/exercises')}>
              Browse Exercises
            </Button>
            <Button variant="secondary" onClick={() => navigate('/workout-planner')}>
              Open Planner
            </Button>
          </div>
        </Header>
      </div>

      <AudioPlayer
        audioUrl="/assets/audio/motivation.wav"
        title="🎧 Pre-Workout Motivation"
        description="Press play, get pumped, and start your session strong."
      />

      <h2 className={styles.sectionTitle}>What you can do</h2>
      <div className={styles.features}>
        {FEATURES.map((feature) => (
          <Card key={feature.title} className={styles.feature} hoverable>
            <div className={styles.featureIcon}>{feature.icon}</div>
            <h3 className={styles.featureTitle}>{feature.title}</h3>
            <p className={styles.featureText}>{feature.text}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
