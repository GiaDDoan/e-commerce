import React, { useEffect, useState } from 'react';
import './Home.css';

// import HomepageBanner from '../../images/pink-banner.png';
import HomepageBanner from '../../images/big-sales-resized.jpg';
import Product from '../product/Product';
import { fetchSamples } from '../../api-helpers/index';
import Loading from '../loading/Loading';

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
    return <Loading />;
  }
  if (status === 'idle') {
    return (
      <div className="home">
        <div>
          <img className="home__image" src={HomepageBanner} alt="" />

          <div className="home__row">
            {samples.map((sample, i) => {
              let checkedTitle = sample.name;

              if (sample.name.length > 50) {
                let splitting = sample.name.split(' ');
                let totalLength = 0;

                for (var x = 0; x < splitting.length; x++) {
                  if (totalLength >= 50) {
                    checkedTitle = splitting
                      .slice(0, x)
                      .join(' ')
                      .concat('...');
                    break;
                  }
                  totalLength += splitting[x].length;
                }
              }

              return (
                <Product
                  name="home"
                  key={i}
                  id={sample._id}
                  title={checkedTitle}
                  price={sample.price}
                  image={sample.imageSrc}
                  rating={sample.rating}
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
