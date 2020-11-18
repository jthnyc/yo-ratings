import React from "react";

const MovieCard = ({ title, year, id, poster, onOpenDetail, selected }) => {
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
      <button onClick={() => onOpenDetail(id)}>More</button>
      {selected ? (
        <div>{console.log("selected in card: ", selected)}</div>
      ) : (
        <div>
          <h5>None selected</h5>
        </div>
      )}
    </li>
  );
};

export default MovieCard;
