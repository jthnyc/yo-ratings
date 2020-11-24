import React from "react";
import styled from "styled-components";

const DetailFront = ({ title, year, poster }) => {
  return (
    <div>
      <Poster>
        <img src={poster} alt="film-poster" />
      </Poster>
      <SmallTitle>
        {title} ({year})
      </SmallTitle>
    </div>
  );
};

export default DetailFront;

const Poster = styled.div`
  // border: 1px solid lime;
  display: flex;
  justify-content: center;
`;

const SmallTitle = styled.p`
  // display: flex;
  // border: 1px solid yellow;
  // width: 80%;
  // align: center;
`;
