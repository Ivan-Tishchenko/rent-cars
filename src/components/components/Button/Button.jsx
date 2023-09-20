import React from 'react';
import css from './Button.module.css';

const Button = ({ textContent, type, onClick }) => {
  return (
    <button type={type} className={css.button} onClick={onClick}>
      {textContent}
    </button>
  );
};

export default Button;
