import React from 'react';
import '../App.css';

const SelectInput = ({ value, onChange }) => {
  return (
    <select className="select" value={value} onChange={onChange}>
      <option value="default">select task (default)</option>
      <option value="task1">Task 1</option>
      <option value="task2">Task 2</option>
    </select>
  );
};

export default SelectInput;