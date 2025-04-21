// This component is used to navigate back to the previous page in the browser history
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton: React.FC = () => {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className="btn btn-secondary position-fixed"
      style={{
        top: '56px',   
        left: '16px',   
        zIndex: 1000
      }}
      onClick={() => navigate(-1)}
    >
      ← Back
    </button>
  );
};

export default BackButton;
