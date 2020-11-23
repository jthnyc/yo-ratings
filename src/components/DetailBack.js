import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
// import styled from "styled-components";

const DetailBack = () => {
  const { selected } = useContext(AppContext);

  return (
    <div>
      {/* <MovieCardButton onClick={() => handleFlip(id)}> */}
      <h3>Director: {selected.Director}</h3>
      <p>{selected.Plot}</p>
      {/* </MovieCardButton> */}
    </div>
  );
};

export default DetailBack;

// const MovieCardButton = styled.button`
//   background: #1a1b41;
//   color: #f1ff37;
// `;
