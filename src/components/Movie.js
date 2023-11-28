import React from 'react';

import classes from './Movie.module.css';

const Movie = (props) => {
  async function deleteMovieHandler(movieId){
    const response = await fetch(`https://react-http-37f2f-default-rtdb.firebaseio.com/movies/${movieId}.json`, {
      method: 'DELETE'
    });
    const data = await response.json();
    console.log(data);
  }

  console.log(props.id);
  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <button onClick={() => deleteMovieHandler(props.id)}>Delete Movie</button>
    </li>
  );
};

export default Movie;
