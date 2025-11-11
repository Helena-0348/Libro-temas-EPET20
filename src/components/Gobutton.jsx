import React from 'react';
import { useNavigate } from 'react-router-dom';

const GoButton = ({ to = '/', label = 'ir a libros disponibles', replace = false, className = '' }) => {
  const navigate = useNavigate();
  const handle = (e) => {
    e.preventDefault();
    navigate(to, { replace });
  };

  return (
    <p className={className}>
      <button type="button" onClick={handle} aria-label={label}>
        {label}
      </button>
    </p>
  );
};

export default GoButton;