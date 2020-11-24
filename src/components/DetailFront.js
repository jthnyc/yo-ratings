import React from "react";
import styled from "styled-components";

const DetailFront = ({ title, year, poster }) => {
  return (
    <div>
      <Poster>
        <img src={poster} alt="film-poster" />
      </Poster>
      <p>
        {title} ({year})
      </p>
    </div>
  );
};

export default DetailFront;

const Poster = styled.div`
  // border: 1px solid lime;
  display: flex;
  justify-content: center;
`;
