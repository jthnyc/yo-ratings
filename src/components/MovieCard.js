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
    // disabled,
  } = useContext(AppContext);
  // const upBtnStatus = disabled;
  // console.log("UP BUTTON STATUS: ", upBtnStatus);

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
              <DetailFront
                id={id}
                poster={
                  poster === "N/A"
                    ? "https://dummyimage.com/310x450/1a1b41/1a1b41"
                    : poster
                }
                title={title}
                year={year}
              />
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
  display: flex;
  justify-content: center;
  align-content: space-between;
  margin: 0.3rem 0.3rem;
  list-style: none;
  // width: 20em;
`;

const MovieDisplay = styled.div`
  // border: 1px solid blue;
  display: flex;
  justify-content: center;
`;

const MovieCardButton = styled.button`
  // border: 5px solid green;
  background: #1a1b41;
  color: var(--lime-yellow);
  cursor: pointer;
  border: none;
  outline: none;
  width: 98%;
  min-height: 500px;
  box-shadow: 0 0 10px var(--teal-green);

  &:hover {
    background-color: var(--light-green);
    color: #1a1b41;
  }
  &:active {
    -webkit-transform: rotateY(180deg);
    transform: rotateY(180deg);
    transition: transform 1s;
    backface-visibility: hidden;
  }
`;

const VotingContainer = styled.div`
  // border: 1px dotted white;
  display: flex;
  justify-content: space-around;
  height: 50px;
  margin-top: 1em;
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
