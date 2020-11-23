import React from "react";
// import { AppContext } from "../contexts/AppContext";
import styled from "styled-components";
// import ReactCardFlip from "react-card-flip";

const DetailFront = ({ title, year, poster }) => {
  // const { handleFlip } = useContext(AppContext);

  return (
    // <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
    <div>
      {/* <MovieCardButton onClick={() => handleFlip(id)}> */}
      <Poster>
        <img src={poster} alt="film-poster" />
      </Poster>
      <p>
        {title} ({year})
      </p>
      {/* </MovieCardButton> */}
    </div>

    // </ReactCardFlip>
  );
};

export default DetailFront;

// const MovieCardButton = styled.button`
//   background: #1a1b41;
//   color: #f1ff37;
//   -webkit-transform: rotateY(180deg);
//   transform: rotateY(180deg);
// `;

const Poster = styled.div`
  // border: 1px solid lime;
  display: flex;
  justify-content: center;
`;
