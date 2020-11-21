import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import styled from "styled-components";

const MovieCard = ({
  title,
  year,
  id,
  poster,
  onOpenDetail,
  onUpVote,
  onDownVote,
}) => {
  const { upCount, downCount } = useContext(AppContext);
  return (
    <MovieCardContainer>
      <li>
        <MovieDisplay>
          <MovieCardButton onClick={() => onOpenDetail(id)}>
            <Poster>
              <img src={poster} alt="film-poster" />
            </Poster>
            <p>
              {title} ({year})
            </p>
          </MovieCardButton>
        </MovieDisplay>

        <VotingContainer>
          <UpVote onClick={onUpVote}>
            <VoteCount>{upCount}</VoteCount>👍
          </UpVote>
          <DownVote onClick={onDownVote}>
            <VoteCount>{downCount}</VoteCount>👎
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
`;

const MovieCardButton = styled.button`
  background: #1a1b41;
  color: #f1ff37;
`;

const Poster = styled.div`
  // border: 1px solid lime;
  display: flex;
  justify-content: center;
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
