import React from 'react';
import './HomeButton.css';

interface SecondaryHomeButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const SecondaryHomeButton: React.FC<SecondaryHomeButtonProps> = ({ children, onClick }) => {
  return (
    <button className="home-button home-button-secondary" onClick={onClick}>
      {children}
    </button>
  );
};

export default SecondaryHomeButton;
