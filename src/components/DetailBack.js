import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
// import styled from "styled-components";

const DetailBack = ({ id }) => {
  const { selected } = useContext(AppContext);
  console.log("SELECTED IN BACK: ", selected);
  return (
    // <MovieCardButton onClick={() => handleFlip(id)}>
    <div>
      <h3>{selected.Title}</h3>
      <h3>Director: {selected.Director}</h3>
      <p>{selected.Plot}</p>
    </div>

    // </MovieCardButton>
  );
};

export default DetailBack;

// const MovieCardButton = styled.button`
//   background: #1a1b41;
//   color: #f1ff37;
//   // -webkit-transform: rotateY(180deg);
//   // transform: rotateY(180deg);
// `;
