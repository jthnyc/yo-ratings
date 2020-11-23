import React from "react";
import styled from "styled-components";

const DetailFront = ({ title, year, poster }) => {
  return (
    // <MovieCardButton onClick={() => handleFlip(id)}>
    <div>
      <Poster>
        <img src={poster} alt="film-poster" />
      </Poster>
      <p>
        {title} ({year})
      </p>
    </div>

    // </MovieCardButton>
  );
};

export default DetailFront;

// const MovieCardButton = styled.button`
//   background: #1a1b41;
//   color: #f1ff37;
//   // -webkit-transform: rotateY(180deg);
//   // transform: rotateY(180deg);
// `;

const Poster = styled.div`
  // border: 1px solid lime;
  display: flex;
  justify-content: center;
`;
