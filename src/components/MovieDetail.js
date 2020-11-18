import React from "react";

const MovieDetail = ({ title, year, id, poster }) => {
  return (
    <li>
      <div>
        <img src={poster} alt="film-poster" />
      </div>
      <div>
        <p>
          {title} ({year})
        </p>
      </div>
      <button>More</button>
    </li>
  );
};

export default MovieDetail;
