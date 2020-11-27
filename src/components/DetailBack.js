import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import styled from "styled-components";

const DetailBack = ({ id }) => {
  const { selected } = useContext(AppContext);
  const selectedMovie = selected.find((movie) => movie.imdbID === id);
  const { Title, Director, Plot, Year } = selectedMovie;

  return (
    <div>
      <FilmTitle>{Title}</FilmTitle>
      <FilmYear>{Year}</FilmYear>
      <FilmDirector>Director: {Director}</FilmDirector>
      <FilmPlot>{Plot === "N/A" ? "" : Plot}</FilmPlot>
    </div>
  );
};

export default DetailBack;

const FilmTitle = styled.h3`
  // border: 1px solid red;
  font-size: 25px;
  margin-top: 2em;
  padding: 0.5em;
  // width: 80%;
`;

const FilmYear = styled.h3`
  // border: 1px solid red;
  font-size: 25px;
`;

const FilmDirector = styled.h3`
  // border: 1px solid red;
  margin: 1em;
`;

const FilmPlot = styled.p`
  // border: 1px solid red;
  margin: 2em;
  padding: 0.2em;
  text-align: left;
`;
