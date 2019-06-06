import React, { Fragment } from './node_modules/react';
import Typist from './node_modules/react-typist';

import Card from '../../Components/Card/Card';

import './Home.css';

const home = () => {
  return (
    <Fragment>
      <div className="home__container">
        <div className="home">
          <div className="home__text">
            <Typist>
              STORE, RATE, SHARE
              <Typist.Backspace count={18} delay={2000} />
              <Typist.Delay ms={500} />
              IN THE SAME PLACE
              <Typist.Backspace count={18} delay={2000} />
              <Typist.Delay ms={500} />
              LIBOFT
            </Typist>
          </div>
        </div>
        <div className="cards">
          <Card
            image="/images/book-solid.svg"
            title="Books"
            description="Read more"
          />
          <Card
            image="/images/film-solid.svg"
            title="Movies"
            description="Watch more"
          />
          <Card
            image="/images/gamepad-solid.svg"
            title="Games"
            description="Play more"
          />
        </div>
      </div>
    </Fragment>
  );
};

export default home;
