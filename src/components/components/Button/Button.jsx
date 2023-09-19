import React from 'react';
import css from './Button.module.css'

const Button = ({ textContent }) => {
  return <button type="button" className={css.button}>{textContent}</button>;
};

export default Button;
