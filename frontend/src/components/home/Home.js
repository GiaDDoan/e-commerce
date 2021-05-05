import React from 'react';
import './Home.css';

import HomepageBanner from '../../images/pink-banner.png';

function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <img className="home__image" src={HomepageBanner} alt="" />
      </div>
    </div>
  );
}

export default Home;
