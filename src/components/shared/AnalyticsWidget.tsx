import React from 'react';
import { useAnalytics } from '../context/AnalyticsContext';
import styles from './AnalyticsWidget.module.css';

interface AnalyticsWidgetProps {
  variant?: 'desktop' | 'mobile';
}

const AnalyticsWidget: React.FC<AnalyticsWidgetProps> = ({ variant = 'desktop' }) => {
  const { visitorData, loading, error } = useAnalytics();

  if (loading) {
    return (
      <div className={`${styles.widget} ${styles[variant]}`}>
        <div className={styles.loading}>Loading analytics...</div>
      </div>
    );
  }

  if (error || !visitorData) {
    return (
      <div className={`${styles.widget} ${styles[variant]}`}>
        <div className={styles.error}>Analytics unavailable</div>
      </div>
    );
  }

  return (
    <div className={`${styles.widget} ${styles[variant]}`}>
      <div className={styles.header}>
        <div className={styles.title}>Visitor Stats</div>
      </div>
      <div className={styles.content}>
        <div className={styles.stat}>
          <span className={styles.label}>Location:</span>
          <span className={styles.value}>
            {visitorData.city}, {visitorData.country_name}
          </span>
        </div>
        <div className={styles.stat}>
          <span className={styles.label}>Visits:</span>
          <span className={styles.value}>{visitorData.visits}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.label}>Region:</span>
          <span className={styles.value}>{visitorData.region}</span>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsWidget; 