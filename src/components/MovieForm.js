import React, { useState } from "react";
import "./MovieForm.css";

const MovieForm = (props) => {
  const [title, setTitle] = useState("");
  const [openingText, setOpeningText] = useState("");
  const [releaseDate, setReleaseDate] = useState("");

  const addMovieHandler = (e) => {
    e.preventDefault();

    const NewMovieObj = {
      title: title,
      openingText: openingText,
      releaseDate: releaseDate,
    };

    props.onAddMovie(NewMovieObj)

    setTitle("");
    setOpeningText("");
    setReleaseDate("");
  };

  return (
    <form onSubmit={addMovieHandler}>
      <div className="movieForm-main">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="movieForm-main">
        <label>Opening Text</label>
        <textarea
          rows={7}
          type="text"
          value={openingText}
          onChange={(e) => setOpeningText(e.target.value)}
        />
      </div>
      <div className="movieForm-main">
        <label>Release Date</label>
        <input
          type="text"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
        />
      </div>
      <button>Add Movie</button>
    </form>
  );
};

export default MovieForm;
