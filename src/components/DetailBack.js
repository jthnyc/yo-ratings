import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

const DetailBack = ({ id }) => {
  const { selected } = useContext(AppContext);
  const selectedMovie = selected.find((movie) => movie.imdbID === id);
  const { Title, Director, Plot } = selectedMovie;

  return (
    <div>
      <h3>{Title}</h3>
      <h3>Director: {Director}</h3>
      <p>{Plot}</p>
    </div>
  );
};

export default DetailBack;
