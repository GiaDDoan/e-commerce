import React, { useEffect, useState } from 'react';
import './Home.css';

import HomepageBanner from '../../images/pink-banner.png';
import Product from '../product/Product';
import { fetchSamples } from '../../api-helpers/index';

function Home() {
  const [status, setStatus] = useState('loading');
  const [samples, setSamples] = useState([]);

  useEffect(() => {
    setStatus('loading');
    const fetchingSample = async () => {
      const sampleRes = await fetchSamples(8);
      if (sampleRes.status === 200) {
        setSamples(sampleRes.samples);
        setStatus('idle');
      } else {
        setStatus('error');
      }
    };
    fetchingSample();
  }, []);

  if (status === 'loading') {
    return <div>Loading</div>;
  }
  if (status === 'idle') {
    console.log('samples', samples);

    return (
      <div className="home">
        <div className="home__container">
          <img className="home__image" src={HomepageBanner} alt="" />

          <div className="home__row">
            {samples.map((sample) => {
              return (
                <Product
                  id={sample._id}
                  title={sample.name}
                  price={sample.price}
                  image={sample.imageSrc}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
