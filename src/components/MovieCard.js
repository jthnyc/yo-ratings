import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

const MovieCard = ({ title, year, id, poster, onOpenDetail }) => {
  const { selected } = useContext(AppContext);
  // console.log("SELECTED: ", selected);
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
      <button onClick={() => onOpenDetail(id)}>Details</button>
    </li>
  );
};

export default MovieCard;
