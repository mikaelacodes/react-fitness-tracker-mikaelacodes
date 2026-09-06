// AudioPlayer.jsx
// Wraps an HTML5 <audio> element with native controls (play/pause). Falls back
// to a message for browsers that cannot play the audio.

import PropTypes from 'prop-types';
import styles from './Media.module.css';

const AudioPlayer = ({
  audioUrl,
  title = 'Motivation Track',
  description = '',
}) => (
  <div className={styles.mediaContainer}>
    <h4 className={styles.mediaTitle}>{title}</h4>
    {/* Conditional rendering (&&): description is optional. */}
    {description && <p className={styles.mediaDesc}>{description}</p>}
    <audio controls className={styles.audio} data-testid="audio-player">
      <source src={audioUrl} type="audio/wav" />
      {/* Fallback content for browsers without HTML5 audio support. */}
      Your browser does not support the audio element.
    </audio>
  </div>
);

AudioPlayer.propTypes = {
  audioUrl: PropTypes.string.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default AudioPlayer;
