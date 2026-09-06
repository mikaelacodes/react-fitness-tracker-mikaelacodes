// NotFound.jsx
// 404 page shown for any unmatched route. Offers programmatic navigation home.

import { useNavigate } from 'react-router-dom';
import Button from '../components/UI/Button';
import styles from './Pages.module.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.notFound}>
      <p className={styles.notFoundCode}>404</p>
      <h1>Page Not Found</h1>
      <p>The page you&apos;re looking for doesn&apos;t exist.</p>
      <Button variant="primary" onClick={() => navigate('/')}>
        Go Home
      </Button>
    </div>
  );
};

export default NotFound;
