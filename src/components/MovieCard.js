import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import styled from "styled-components";
import DetailFront from "./DetailFront";
import DetailBack from "./DetailBack";

const MovieCard = ({ title, year, id, up, down, poster, flipped }) => {
  const {
    selected,
    handleFlip,
    handleUpCount,
    handleDownCount,
    disabled,
  } = useContext(AppContext);
  const upBtnStatus = disabled;
  console.log("UP BUTTON STATUS: ", upBtnStatus);

  return (
    <MovieCardContainer>
      <li>
        <MovieDisplay>
          <MovieCardButton onClick={() => handleFlip(id)}>
            {selected.find((movie) => movie.imdbID === id) &&
            flipped === true ? (
              // {selected.imdbID === id ? (
              <DetailBack id={id} />
            ) : (
              <DetailFront id={id} poster={poster} title={title} year={year} />
            )}
          </MovieCardButton>
        </MovieDisplay>

        <VotingContainer>
          <UpVote onClick={() => handleUpCount(id)}>
            <VoteCount>{up ? up : 0}</VoteCount>👍
          </UpVote>
          <DownVote onClick={() => handleDownCount(id)}>
            <VoteCount>{down ? down : 0}</VoteCount>👎
          </DownVote>
        </VotingContainer>
      </li>
    </MovieCardContainer>
  );
};

export default MovieCard;

const MovieCardContainer = styled.div`
  // border: 1px solid yellow;
  margin: 0.3rem 0.3rem;
  list-style: none;
  // width: 20em;
`;

const MovieDisplay = styled.div`
  display: flex;
  justify-content: center;

  // &:hover {
  //   background-color: black;
  //   -webkit-transform: rotateY(180deg);
  //   transform: rotateY(180deg);
  // }
`;

const MovieCardButton = styled.button`
  background: #1a1b41;
  color: #f1ff37;
  cursor: pointer;
  outline: none;
  &:hover {
    background-color: yellow;
  }
  &:active {
    transform: rotateY(180deg);
    transition: transform 1s;
    backface-visibility: hidden;
  }
  // -webkit-transform: rotateY(180deg);
`;

const VotingContainer = styled.div`
  // border: 1px dotted white;
  display: flex;
  justify-content: center;
  height: 50px;
`;

const UpVote = styled.button`
  border: 0.5px solid #f1ffe7;
  // border-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1a1b41;
  color: #baff29;
  border-radius: 1rem;
  width: 80px;
`;

const DownVote = styled.button`
  border: 0.5px solid #f1ffe7;
  // border-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  border-radius: 1rem;
  background-color: #1a1b41;
  color: #baff29;
`;

const VoteCount = styled.h5`
  font-size: 20px;
`;
