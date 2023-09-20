import { nanoid } from 'nanoid';
import React from 'react';

const Dropdawn = ({ variables, inputId }) => {
  return (
    <datalist id={inputId}>
      {variables.map(variant => (
        <option value={variant} key={nanoid()} />
      ))}
    </datalist>
  );
};

export default Dropdawn;
