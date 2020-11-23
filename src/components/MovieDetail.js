import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import styled from "styled-components";
import ReactCardFlip from "react-card-flip";

const MovieDetail = ({ title, year, id, poster }) => {
  const { isFlipped, handleFlip } = useContext(AppContext);

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <div>
        <MovieCardButton onClick={() => handleFlip(id)}>
          <Poster>
            <img src={poster} alt="film-poster" />
          </Poster>
          <p>
            {title} ({year})
          </p>
        </MovieCardButton>
      </div>
      <div>
        this is back of the card.
        <button onClick={() => handleFlip(id)}>Flip</button>
      </div>
    </ReactCardFlip>
  );
};

export default MovieDetail;

const MovieCardButton = styled.button`
  background: #1a1b41;
  color: #f1ff37;
`;

const Poster = styled.div`
  // border: 1px solid lime;
  display: flex;
  justify-content: center;
`;
