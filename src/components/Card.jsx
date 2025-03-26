import React from 'react';
import { DESCRIPTION, TERMS } from '../constants/content';
import '../App.css';

const Card = ({ children }) => {
  return (
    <div className="card">
      <h1 className="title">TotalSegmentator</h1>
      <p className="description">{DESCRIPTION}</p>
      <p className="terms">{TERMS}</p>
      {children}
    </div>
  );
};

export default Card;