import React from 'react';
import { ImSpinner2 } from 'react-icons/im';

import './Spinner.css';

const Spinner = () => {
  return (
    <div className="spinner-wrapper">
      <ImSpinner2 className="spinner" />
    </div>
  );
};

export default Spinner;
