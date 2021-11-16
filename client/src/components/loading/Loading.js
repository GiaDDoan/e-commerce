import React from 'react';
import { ImSpinner2 } from 'react-icons/im';

import './Loading.css';

const Loading = () => {
  return (
    <div className="spinner-wrapper">
      <ImSpinner2 className="spinner" />
    </div>
  );
};

export default Loading;
