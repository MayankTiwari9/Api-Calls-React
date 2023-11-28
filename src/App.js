import React, { useState, useEffect } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import Loader from "./components/Loader";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryInterval, setRetryInterval] = useState(null);

  const fetchMovieHandler = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/films");

      if (!response.ok) {
        throw new Error("Something went wrong ...Retrying!");
      }

      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => ({
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date,
      }));
      setMovies(transformedMovies);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      retryFetching();
    }
  };

  const retryFetching = () => {
    const intervalId = setInterval(() => {
      fetchMovieHandler();
    }, 5000);
    setRetryInterval(intervalId);
  };

  const cancelRetryHandler = () => {
    setIsLoading(false);
    setError("Fetching movies canceled by user.");
    if (retryInterval) {
      clearInterval(retryInterval);
      setRetryInterval(null);
    }
  };

  useEffect(() => {
    if (!isLoading && error && !retryInterval) {
      // Retry only when not already loading and there's an error
      retryFetching();
    }
  }, [isLoading, error, retryInterval, retryFetching]);

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
        <button onClick={cancelRetryHandler} disabled={!retryInterval}>
          Cancel Retry
        </button>
      </section>
      <section>
        {isLoading ? <Loader /> : <MoviesList movies={movies} />}
        {!isLoading && error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
