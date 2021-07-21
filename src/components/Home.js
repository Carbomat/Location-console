import React from 'react';
import { Link } from 'react-router-dom';
import classes from '../styles/Home.module.css';

const Home = () => (
  <div className={classes.Home}>
    <div className={classes.Overlay}>
      <div className="d-flex justify-content-center flex-column align-items-center h-75">
        <h2> Louez votre PS5 avec Run Market des maintenant ! </h2>
        <div className="d-flex mt-3">
          
          <Link to="/login" className={classes.Button}>
            Ca m'interesse
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default Home;
