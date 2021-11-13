import React, { useEffect, useState } from 'react';
import { fetchProductPageSample } from '../../../api-helpers/product-page-helper';
import './Samples.css';

const Samples = ({ size, sampleKey, sample }) => {
  const [status, setStatus] = useState('loading');
  const [samples, setSamples] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setStatus('loading');

    const fetchSample = async () => {
      const sampleRes = await fetchProductPageSample(size, sampleKey, sample);
      if (sampleRes.status === 200) {
        setSamples(sampleRes.samples);
        setStatus('idle');
      } else {
        setStatus('error');
      }
    };
    fetchSample();

    // return () => {
    //   cleanup
    // }
  }, []);

  if (status === 'idle') {
    console.log('SAMPLES', samples);
    return (
      <div className="product-sample-container">
        {samples.map((sample) => {
          const { _id, name, companyId } = sample;

          return (
            <div key={_id} className="product-sample-wrapper">
              <div>{companyId}</div>
            </div>
          );
        })}
      </div>
    );
  } else {
    return null;
  }
};

export default Samples;
