import React, { useState, useEffect, useCallback } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";
import Loader from "./components/Loader";
import MovieForm from "./components/MovieForm";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryInterval, setRetryInterval] = useState(null);

  const fetchMovies = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://react-http-37f2f-default-rtdb.firebaseio.com/movies.json");

      if (!response.ok) {
        throw new Error("Something went wrong ...Retrying!");
      }

      const data = await response.json();

      const loadedMovies = [];

      for(const key in data){
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      setMovies(loadedMovies);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      retryFetching();
    }
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  async function addMovieHandler(movie){
    const response = await fetch('https://react-http-37f2f-default-rtdb.firebaseio.com/movies.json', {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
  }

  const retryFetching = useCallback(() => {
    const intervalId = setInterval(fetchMovies, 5000);
    setRetryInterval(intervalId);
  }, [fetchMovies]);

  const cancelRetryHandler = useCallback(() => {
    setIsLoading(false);
    setError("Fetching movies canceled by the user.");
    if (retryInterval) {
      clearInterval(retryInterval);
      setRetryInterval(null);
    }
  }, [retryInterval]);

  useEffect(() => {
    if (!isLoading && error && !retryInterval) {
      retryFetching();
    }
  }, [isLoading, error, retryInterval]);

  return (
    <React.Fragment>
      <section>
        <MovieForm onAddMovie={addMovieHandler}/>
      </section>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
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
