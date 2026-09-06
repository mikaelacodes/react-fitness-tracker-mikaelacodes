// ProgressChart.jsx
// Simple horizontal bar chart for visualising progress data. Each bar width is
// set with an inline style computed from the value relative to the max.

import PropTypes from 'prop-types';
import styles from './WorkoutLog.module.css';

const ProgressChart = ({ title = 'Progress', data = [] }) => {
  // Data transformation: the largest value scales the bars (min 1 to avoid /0).
  const max = Math.max(1, ...data.map((d) => d.value));

  return (
    <div className={styles.chart}>
      <h3>{title}</h3>

      {/* Ternary: empty state vs. the rendered bars. */}
      {data.length === 0 ? (
        <p className={styles.chartEmpty}>No data to display yet.</p>
      ) : (
        <ul className={styles.bars}>
          {data.map((item) => (
            <li key={item.label} className={styles.barRow}>
              <span className={styles.barLabel}>{item.label}</span>
              <div className={styles.barTrack}>
                {/* Inline style: bar width as a percentage of the max value. */}
                <div
                  className={styles.barFill}
                  style={{ width: `${(item.value / max) * 100}%` }}
                />
              </div>
              <span className={styles.barValue}>{item.value}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

ProgressChart.propTypes = {
  title: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ),
};

export default ProgressChart;
