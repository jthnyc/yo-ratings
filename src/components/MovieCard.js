import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

const MovieCard = ({
  title,
  year,
  id,
  poster,
  onOpenDetail,
  onUpVote,
  onDownVote,
}) => {
  const { upCount, downCount } = useContext(AppContext);
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
      <div>
        <div>
          <h5>{upCount}</h5>
          <button onClick={onUpVote}>Up Vote</button>
        </div>
        <div>
          <h5>{downCount}</h5>
          <button onClick={onDownVote}>Down Vote</button>
        </div>
      </div>
      <button onClick={() => onOpenDetail(id)}>Details</button>
    </li>
  );
};

export default MovieCard;
