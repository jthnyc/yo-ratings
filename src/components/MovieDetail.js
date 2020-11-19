import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

const MovieDetail = () => {
  const { selected } = useContext(AppContext);
  console.log("SELECTED IN DETAIL ==== ", selected);
  return (
    <div>
      <h4>Director: {selected.Director}</h4>
      {/* <h4>Ratings: {selected.Ratings[0]}</h4> */}
      <p>Plot: {selected.Plot}</p>
    </div>
  );
};

export default MovieDetail;
