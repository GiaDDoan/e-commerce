import React, { useEffect, useState } from 'react';
import './Home.css';

// import HomepageBanner from '../../images/pink-banner.png';
import HomepageBanner from '../../images/big-sales-resized.jpg';
import Product from '../product/Product';
import { fetchSamples } from '../../api-helpers/index';

function Home() {
  const [status, setStatus] = useState('loading');
  const [samples, setSamples] = useState([]);

  useEffect(() => {
    setStatus('loading');
    const fetchingSample = async () => {
      const sampleRes = await fetchSamples(6);
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
    return (
      <div className="home">
        <div className="home__container">
          <img className="home__image" src={HomepageBanner} alt="" />

          <div className="home__row">
            {samples.map((sample, i) => {
              let rating = Math.random() * 1 + 4;

              return (
                <Product
                  name="home"
                  key={i}
                  id={sample._id}
                  title={sample.name}
                  price={sample.price}
                  image={sample.imageSrc}
                  rating={rating}
                  stock={sample.numInStock}
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
