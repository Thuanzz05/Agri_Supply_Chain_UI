import React from 'react';
import './HomeButton.css';

interface PrimaryHomeButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const PrimaryHomeButton: React.FC<PrimaryHomeButtonProps> = ({ children, onClick }) => {
  return (
    <button className="home-button home-button-primary" onClick={onClick}>
      {children}
    </button>
  );
};

export default PrimaryHomeButton;
