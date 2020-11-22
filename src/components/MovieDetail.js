import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import styled from "styled-components";

const MovieDetail = () => {
  const { selected } = useContext(AppContext);
  // console.log("SELECTED IN DETAIL ==== ", selected);
  return (
    <MovieDetailCard>
      <h4>Director: {selected.Director}</h4>
      {/* <h4>Ratings: {selected.Ratings[0]}</h4> */}
      <p>Plot: {selected.Plot}</p>
    </MovieDetailCard>
  );
};

export default MovieDetail;

const MovieDetailCard = styled.div`
  border: 1px solid yellow;
`;
