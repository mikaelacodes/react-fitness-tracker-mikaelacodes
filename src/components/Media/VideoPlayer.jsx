// VideoPlayer.jsx
// Wraps an HTML5 <video> element with native controls (play/pause/seek). Falls
// back to a message for browsers that cannot play the video.

import PropTypes from 'prop-types';
import styles from './Media.module.css';

const VideoPlayer = ({
  videoUrl,
  title = 'Exercise Demonstration',
  description = '',
}) => (
  <div className={styles.mediaContainer}>
    <h3 className={styles.mediaTitle}>{title}</h3>
    {/* Conditional rendering (&&): only show a description if one is provided. */}
    {description && <p className={styles.mediaDesc}>{description}</p>}
    <video controls className={styles.video} data-testid="video-player">
      <source src={videoUrl} type="video/mp4" />
      {/* Fallback content for browsers without HTML5 video support. */}
      Your browser does not support the video tag.
    </video>
  </div>
);

VideoPlayer.propTypes = {
  videoUrl: PropTypes.string.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default VideoPlayer;
