import React from 'react';

const Dropdawn = ({ variables, setVariant }) => {
  return (
    <ul>
      {variables.map(variant => (
        <li>
          <button type="button" onClick={() => setVariant(variant)}>
            {variant}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Dropdawn;
