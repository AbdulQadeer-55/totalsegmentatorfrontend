import React from 'react';
import '../App.css';

const CheckboxGroup = ({ fastProcessing, setFastProcessing, calculateStats, setCalculateStats }) => {
  return (
    <div className="checkbox-container">
      <label className="checkbox-label">
        <input
          type="checkbox"
          className="checkbox"
          checked={fastProcessing}
          onChange={(e) => setFastProcessing(e.target.checked)}
        />
        Choose a subset to avoid long runtime (if none is selected all are selected)
      </label>
      <label className="checkbox-label">
        <input
          type="checkbox"
          className="checkbox"
          checked={fastProcessing}
          onChange={(e) => setFastProcessing(e.target.checked)}
        />
        Enable fast processing
      </label>
      <label className="checkbox-label">
        <input
          type="checkbox"
          className="checkbox"
          checked={calculateStats}
          onChange={(e) => setCalculateStats(e.target.checked)}
        />
        Calculate statistics (volume and intensity)
      </label>
    </div>
  );
};

export default CheckboxGroup;