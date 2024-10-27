import React from 'react';
import styles from './style/Finathon.module.css';

const FinathonHeading = () => {
  const text = 'FINATHON!';

  return (
    <h1 className={`${styles.heading} tracking-wider font-simple `}>
      {text.split('').map((letter, index) => (
        <span key={index} className={styles.letter}>
          {letter}
        </span>
      ))}
    </h1>
  );
};

export default FinathonHeading;
